import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokens, clearTokens } from "../reducers/authReducer";

const useAxios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hookunu kullanarak navigate fonksiyonunu alın
  const { token, refreshToken } = useSelector((state) => state.auth); // Redux state'inden token ve refreshToken alın

  // Token gerektiren istekler için axios instance oluşturun
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_API_URL}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  axiosInstance.interceptors.response.use(
    (response) => response, // Başarılı yanıtları doğrudan döndürün
    async (error) => {
      const originalRequest = error.config;
      console.log("axios error interceptor:", error);
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Tekrar etme işaretini ekleyin
        try {
          console.log("refreshToken");
          //refreshToken state'te mevcut değilse, yedek olarak localStorage'dan almayı deneyi
          const storedRefreshToken = refreshToken || localStorage.getItem("refreshToken");

          if (!storedRefreshToken) {
            // Eğer refreshToken state'de yoksa veya localStorage'den alınamıyorsa, kullanıcıyı giriş sayfasına yönlendir
            dispatch(clearTokens());
            navigate("/login"); // useNavigate ile yönlendirin
            return Promise.reject(error);
          }

          // Yenileme isteği yapmak için axiosPublic kullanın, böylece token eklenmez
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_API_URL}/login/refreshtoken`,
            {
              accessToken: token || localStorage.getItem("accessToken"),
              refreshToken: storedRefreshToken,
            }
          );
          //<!IMPORTANT> BURADA RESPONSE KONTROLLERİ YAPILACAK
          const { AccessToken: newToken, RefreshToken: newRefreshToken } = response.AccessToken;
          // Yeni tokenları localStorage'a kaydedin
          localStorage.setItem("accessToken", newToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          dispatch(setTokens({ token: newToken, refreshToken: newRefreshToken })); // Yeni tokenları Redux state'e kaydedin
          // Authorization header'ı yeni token ile güncelleyin
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest); // Orijinal isteği yeni token ile tekrar edin
        } catch (refreshError) {
          // Yenileme hatalarını yönetin, tokenları temizleyin ve login sayfasına yönlendirin
          console.error("Token refresh failed:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(clearTokens());
          navigate("/login");
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // Diğer tüm hatalar için hatayı olduğu gibi döndürün
    }
  );

  // Token gerektirmeyen istekler için axiosPublic instance oluşturun
  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_API_URL}`,
  });

  return { axiosInstance, axiosPublic };
};

export default useAxios;
