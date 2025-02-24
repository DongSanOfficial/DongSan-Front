import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocationStore } from "../../store/useLocationStore";
import { LocationState } from "../../store/locationStore.type";
import instance from "../../apis/instance";
import SplashScreen from "src/components/SplashScreen";

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

        const response = await instance.post("/dev/token/expired");
        const { accessTokenExpired, refreshTokenExpired } = response.data.data;

        if (!accessTokenExpired && !refreshTokenExpired) {
          setTimeout(() => navigate("/navigation"), 2000);
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