import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../apis/instance";
import SplashScreen from "src/components/SplashScreen";
import { useLocationPermission } from "../../hooks/useLocationPermission";

export default function Splash() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { permissionStatus, location } = useLocationPermission();

  useEffect(() => {
    const initializeApp = async () => {
      if (permissionStatus === "checking") {
        return;
      }

      if (permissionStatus !== "granted") {
        console.log("위치 정보 권한이 필요합니다.");
        setIsLoading(false);
        navigate("/locationAcceptance");
        return;
      }

      try {
        await proceedWithTokenCheck();
      } catch (error) {
        console.error("초기화 중 오류 발생:", error);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/signin");
        }, 2000);
      }
    };

    const proceedWithTokenCheck = async () => {
      try {
        const response = await instance.post("/dev/token/expired");
        const { accessTokenExpired, refreshTokenExpired } = response.data;

        setTimeout(() => {
          setIsLoading(false);
          if (!accessTokenExpired && !refreshTokenExpired) {
            navigate("/main");
          } else {
            navigate("/signin");
          }
        }, 2000);
      } catch (error) {
        console.error("토큰 확인 중 오류 발생:", error);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/signin");
        }, 2000);
      }
    };

    initializeApp();
  }, [navigate, permissionStatus, location]);

  return isLoading ? <SplashScreen /> : null;
}
