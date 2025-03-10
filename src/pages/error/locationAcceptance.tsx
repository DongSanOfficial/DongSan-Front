import React, { useEffect } from "react";
import { MdLocationOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { theme } from "src/styles/colors/theme";
import { useLocationPermission } from "../../hooks/useLocationPermission";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  display: flex;
  height: 100dvh;
  background-color: white;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const LocationIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: ${theme.LocationAcceptIconBg};
  border-radius: 50%;
  margin-bottom: 50px;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const LocationOffIcon = styled(MdLocationOff)`
  color: ${theme.LocationAcceptIcon};
  font-size: 4rem;
`;

const LogoText = styled.h3`
  font-size: 22px;
  margin-top: 15px;
  font-weight: 700;
  color: ${theme.Black};
`;

const WarningTextContainer = styled.div`
  margin-top: 30px;
  width: 85%;
  max-width: 350px;
  background-color: ${theme.WarningTextBg};
  border-left: 4px solid ${theme.LocationAcceptIcon};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const WarningText = styled.p`
  color: ${theme.Gray800};
  font-weight: 500;
  text-align: left;
  line-height: 1.6;
  font-size: 16px;
`;

const WarningHighlight = styled.span`
  font-weight: 700;
  color: ${theme.WarningHighlight};
`;

const SettingsInstruction = styled.div`
  margin-top: 30px;
  padding: 16px;
  background-color: ${theme.Gray100};
  border-radius: 8px;
  width: 85%;
  max-width: 350px;
`;

const InstructionText = styled.p`
  color: ${theme.Gray700};
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
  font-size: 15px;
`;

export default function LocationAcceptance() {
  const navigate = useNavigate();
  const { permissionStatus, requestLocation } = useLocationPermission();

  useEffect(() => {
    if (permissionStatus === "granted") {
      const getLocationAndNavigate = async () => {
        try {
          await requestLocation();
          console.log("위치 정보 수락됨");
          navigate(-1);
        } catch (error) {
          console.error("현재 위치 정보 가져오기 오류:", error);
        }
      };

      getLocationAndNavigate();
    }
  }, [permissionStatus, requestLocation, navigate]);

  if (permissionStatus === "granted") {
    return null;
  }

  return (
    <Container>
      <LogoContainer>
        <LocationIconWrapper>
          <LocationOffIcon />
        </LocationIconWrapper>
        <LogoText>위치 정보 허용이 필요합니다</LogoText>

        <WarningTextContainer>
          <WarningText>
            동산은 위치 정보를 통해 나만의 산책로를 <br />
            생성하고 공유합니다.
          </WarningText>
          <WarningText style={{ marginTop: "8px" }}>
            <WarningHighlight>
              위치정보 액세스를 허용하지 않으면 <br />
              서비스를 이용할 수 없습니다.
            </WarningHighlight>
          </WarningText>
        </WarningTextContainer>

        <SettingsInstruction>
          <InstructionText>
            디바이스 설정에서 위치 정보 접근을 허용해 주세요!
          </InstructionText>
        </SettingsInstruction>
      </LogoContainer>
    </Container>
  );
}
