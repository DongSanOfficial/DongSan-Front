import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "src/utils/cookieUtils";
import { useLocationStore } from "../../store/useLocationStore";
import { LocationState } from "../../store/locationStore.type";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
`;

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

        const accessToken = getCookie("access_token");
        console.log("토큰: ", accessToken);

        // 유효 여부 검사, 리프레시 api 연동시 수정해야 함. 
        setTimeout(() => {
          if (!accessToken) {
          //   navigate("/main");
          // } else {
            navigate("/signin");
          }
        }, 2000);
      } catch (error) {
        console.error("초기화 중 오류 발생:", error);
        setTimeout(() => {
          const accessToken = getCookie("access_token");
          if (!accessToken) {
          //   navigate("/main");
          // } else {
            navigate("/signin");
          }
        }, 2000);
      }
    };

    initializeApp();
  }, [navigate, getCurrentLocation]);

  return (
    <Wrapper>
      <b>동산과 동네산책해요</b>
    </Wrapper>
  );
}
