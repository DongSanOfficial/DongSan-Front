import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import { ReactComponent as Member } from "src/assets/svg/Member.svg";
import { ReactComponent as Crown } from "src/assets/svg/Crown.svg";
import DefaultImage from "src/assets/images/profile.png";
import { forwardRef } from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.Gray100};
  border-radius: 12px;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CrewInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CrewImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 8px;
  object-fit: cover;
  background-color: ${theme.Gray50};
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 30px;
  background-color: ${theme.Gray700};
  margin: 0 8px;
`;

const CrewName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.Black};
`;

const CrownIcon = styled.div`
  display: flex;
  align-items: center;
`;

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MemberCount = styled.div`
  font-size: 14px;
  color: ${theme.Gray800};
`;

interface CrewCardProps {
  crewName: string;
  variant: "myCrew" | "recommended";
  crewImageUrl: string;
  isManager?: boolean;
  memberCount?: number;
  onClick?: () => void;
}

const CrewCard = forwardRef<HTMLDivElement, CrewCardProps>(
  (
    {
      crewName,
      variant,
      crewImageUrl,
      isManager = false,
      memberCount,
      onClick,
    },
    ref
  ) => {
    return (
      <Container ref={ref} onClick={onClick}>
        <ImageContainer>
          <CrewInfo>
            <CrewImage src={crewImageUrl ?? DefaultImage} alt="crew" />
            <VerticalDivider />
            <CrewName>{crewName}</CrewName>
          </CrewInfo>
          {variant === "myCrew" && isManager && (
            <CrownIcon>
              <Crown />
            </CrownIcon>
          )}
        </ImageContainer>
        {variant === "recommended" && memberCount !== undefined && (
          <MemberContainer>
            <Member />
            <MemberCount>{memberCount}명</MemberCount>
          </MemberContainer>
        )}
      </Container>
    );
  }
);

export default CrewCard;