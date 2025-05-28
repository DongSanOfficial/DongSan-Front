import styled from "styled-components";
import { MdLock, MdGroups, MdDateRange } from "react-icons/md";
import { theme } from "src/styles/colors/theme";

const Card = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  margin: 0.75rem 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f0f0f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  background: ${theme.LightGreen100};
  color: white;
  font-size: 0.6rem;
  font-weight: 500;
  padding: 3px 6px;
  border-radius: 8px;
`;

const Info = styled.div`
  margin-left: 1rem;
  flex-grow: 1;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 0.25rem;

  svg {
    margin-right: 0.5rem;
    font-size: 0.85rem;
  }
`;

const LockIcon = styled(MdLock)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 1rem;
`;

interface CrewProps {
  name: string;
  visibility: string;
  limitEnable: boolean;
  memberCount: number;
  memberLimit: number;
  crewImageUrl: string;
  createdAt: string;
  isJoined: boolean;
  onClick: () => void;
}

export default function SearchCrewCard({
  onClick,
  name,
  visibility,
  limitEnable,
  memberCount,
  memberLimit,
  crewImageUrl,
  createdAt,
  isJoined,
}: CrewProps) {
  return (
    <Card onClick={onClick}>
      <ImageWrapper>
        <img src={crewImageUrl} alt={name} />
        {isJoined && <Badge>활동중</Badge>}
      </ImageWrapper>
      <Info>
        <Title>{name}</Title>
        <DetailRow>
          <MdGroups />
          {limitEnable ? `${memberCount} / ${memberLimit}명` : "제한 없음"}
        </DetailRow>
        <DetailRow>
          <MdDateRange />
          {createdAt}
        </DetailRow>
      </Info>
      {visibility === "PRIVATE" && <LockIcon />}
    </Card>
  );
}
