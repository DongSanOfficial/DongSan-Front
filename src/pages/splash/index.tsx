import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "src/utils/cookieUtils";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
`;

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      const accessToken = getCookie("access_token");
      console.log("토큰: ", accessToken);

      setTimeout(() => {
        // if (accessToken) {
        //   navigate("/main");
        // } else {
        //   navigate("/signin");
        // }
        if (!accessToken) {
          navigate("/signin");
        }
      }, 2000);
    };

    checkTokenAndNavigate();
  }, [navigate]);

  return (
    <Wrapper>
      <b>동산과 동네산책해요</b>
    </Wrapper>
  );
}
