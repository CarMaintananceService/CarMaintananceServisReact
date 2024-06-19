import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import useAxios from "../../../service/useAxios"; // API istekleri için axios'u ekliyoruz.
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
//import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// Redux actions
import { setTokens } from "../../../reducers/authReducer";
import { Email } from "@mui/icons-material";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { axiosInstance } = useAxios();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Her gönderimde hatayı sıfırlıyoruz.

    try {
      const response = await axiosInstance.post("/Login/GenerateAccesstoken", {
        UserName: email,
        Password: password,
      });

      if (!response.data.Result.isActive || response.data.Result.isExpired) {
        return;
      }
      // Eğer giriş başarılı olursa, JWT access ve refresh token'ları localStorage'a kaydediyoruz.
      if (
        response.data.Result.AccessToken &&
        response.data.Result.AccessToken.token &&
        response.data.Result.AccessToken.refreshToken
      ) {
        const { token, refreshToken } = response.data.Result.AccessToken;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        // Redux state'ini güncelle
        dispatch(setTokens({ token: token, refreshToken: refreshToken }));
        // Yönlendirme veya başka işlemler burada yapılabilir.
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <BasicLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            {error && (
              <MDBox mt={2} mb={2}>
                <MDTypography variant="caption" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
