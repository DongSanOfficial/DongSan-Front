import styled from "styled-components";
import { ReactComponent as HeartIcon } from "../../../assets/svg/Heart.svg";
import { ReactComponent as StarIcon } from "../../../assets/svg/Star.svg";
import { theme } from "../../../styles/colors/theme";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
  width: calc(100% - 10px);
  padding: 17px 19px 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
`;

const PathCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const PathContent = styled.div`
  display: flex;
  gap: 10px;
`;

const WalkwayImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  background-color: grey;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Title = styled.h1`
  color: ${theme.Green500};
  font-size: 18px;
  letter-spacing: -0.5px;
`;

const HashTag = styled.span`
  color: ${theme.Black};
  font-size: 14px;
  letter-spacing: -0.5px;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StarGroup = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: 13px;
`;

const StarRating = styled.span`
  margin-right: 4px;
  color: ${theme.Gray700};
`;

const StarWrapper = styled.div`
  position: relative;
  width: 14px;
  height: 14px;
`;

const StyledStar = styled(StarIcon)<{ isactive: string }>`
  width: 14px;
  height: 14px;
  position: absolute;
  left: 0;
  path {
    fill: ${({ isactive }) => isactive === "true" ? theme.Yellow : theme.Gray100};
  }
`;

const PartialStar = styled(StyledStar)<{ width: number }>`
  clip-path: ${({ width }) => `inset(0 ${100 - width}% 0 0)`};
  path {
    fill: ${theme.Yellow};
  }
`;

const Distance = styled.h1`
  font-size: 38px;
  font-family: "Lalezar";
  line-height: 1;
  letter-spacing: -0.05em;
  text-align: right;
`;

const StyledHeart = styled(HeartIcon)<{ $isActive: boolean }>`
  width: 18px;
  height: 18px;
  fill: ${({ $isActive }) => $isActive ? theme.Green500 : theme.Gray200};
  cursor: pointer;
  transition: fill 0.2s ease;
`;

interface PathCardProps {
  walkwayId: number;
  pathimage: string;
  pathname: string;
  hashtag: string;
  distance: string;
  starCount: number;
  reviewCount: number;
  isLiked: boolean;
  onLikeClick: () => void;
  onClick?: () => void;
}

export default function PathCard({
  walkwayId,  
  pathimage,
  pathname,
  hashtag,
  distance,
  starCount,
  reviewCount,
  isLiked,
  onLikeClick,
  onClick,
}: PathCardProps) {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((value) => {
      const diff = rating - (value - 1);
      const percentage = Math.min(Math.max(diff, 0), 1) * 100;

      return (
        <StarWrapper key={value}>
          <StyledStar isactive="false" />
          {percentage > 0 && <PartialStar width={percentage} isactive="true" />}
        </StarWrapper>
      );
    });
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeClick();
  };

  const goDetailPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/main/recommend/detail/${walkwayId}`);
  };

  return (
    <Layout onClick={onClick}>
      <PathCardContainer>
        <PathContent>
          <WalkwayImage 
            src={pathimage} 
            onClick={goDetailPage} 
            alt="산책로 이미지" 
          />
          <ContentWrapper>
            <InfoSection>
              <Title>{pathname}</Title>
              <HashTag>{hashtag}</HashTag>
              <StarContainer>
                <StarGroup>
                  <StarRating>{starCount.toFixed(1)}</StarRating>
                  {renderStars(starCount)}
                  <span>리뷰 {reviewCount}개</span>
                </StarGroup>
              </StarContainer>
            </InfoSection>
            <Distance>{distance}</Distance>
          </ContentWrapper>
        </PathContent>
        <StyledHeart $isActive={isLiked} onClick={handleLikeClick} />
      </PathCardContainer>
    </Layout>
  );
}