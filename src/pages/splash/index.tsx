import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "src/utils/cookieUtils";
import { useLocationStore } from "../../store/useLocationStore";
import { LocationState } from "../../store/locationStore.type";
import instance from "../../apis/instance";
import SplashScreen from "src/components/SplashScreen";
import { refreshTokens } from "src/apis/auth";

export default function Splash() {
  const navigate = useNavigate();
  const getCurrentLocation = useLocationStore(
    (state: LocationState) => state.getCurrentLocation
  );

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const location = await getCurrentLocation();
        console.log("스플래시 화면에서 받아온 현재 위치:", location);

        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");

        if (!accessToken || !refreshToken) {
          setTimeout(() => navigate("/signin"), 2000);
          return;
        }

        const response = await instance.post("/dev/token/expired", {
          accessToken,
          refreshToken,
        });

        const { accessTokenExpired, refreshTokenExpired } = response.data.data;

        if (!accessTokenExpired && !refreshTokenExpired) {
          //나중에 여기 "/main" 으로 변경하기
          setTimeout(() => navigate("/navigation"), 2000);
        } else if (accessTokenExpired && !refreshTokenExpired) {
          const success = await refreshTokens(refreshToken);
          setTimeout(() => navigate(success ? "/main" : "/signin"), 2000);
        } else {
          setTimeout(() => navigate("/signin"), 2000);
        }
      } catch (error) {
        console.error("초기화 중 오류 발생:", error);
        setTimeout(() => navigate("/signin"), 2000);
      }
    };

    initializeApp();
  }, []);

  return <SplashScreen />;
}
