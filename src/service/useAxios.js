import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth); //TODO:state güncellenecek login ardından

  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_API_URL}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  axiosInstance.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
        try {
          const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the stored refresh token.
          // Make a request to your auth server to refresh the token.
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_API_URL}/Login/RefreshToken`,
            {
              refreshToken,
            }
          );
          const { Token, RefreshToken: newRefreshToken } = response.AccessToken;
          // Store the new access and refresh tokens.
          localStorage.setItem("accessToken", Token);
          localStorage.setItem("refreshToken", newRefreshToken);
          //TODO: update state with these values
          // Update the authorization header with the new access token.
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
          return axiosInstance(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
          console.error("Token refresh failed:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    }
  );

  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_API_URL}`,
  });

  return { axiosInstance, axiosPublic };
};

export default useAxios;
