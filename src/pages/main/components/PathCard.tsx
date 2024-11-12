import styled from "styled-components";
import { ReactComponent as HeartIcon } from "../../../../assets/svg/Heart.svg";
import { ReactComponent as StarIcon } from "../../../../assets/svg/Star.svg";
import { ReactComponent as RightArrowIcon } from "../../../../assets/svg/RightArrow.svg";
import { theme } from "../../../styles/colors/theme";

const Layout = styled.div`
  width: calc(100% - 10px);
  padding: 17px 19px 12px 19px ;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;

`;

const PathCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PathInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const PathDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;

  span{
      font-size: 13px;

  }
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

    span:first-child {  
    font-size: 13px;
    font-weight: bold;
    color: ${props => props.theme.Green500};
  }

  span:last-child {   
    font-size: 12px;
    font-weight: 500;

  }

`;

const UserReactionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
`;

const ReactionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
`;

const StyledHeart = styled(HeartIcon)<{ $isActive: boolean }>`
  width: 18px;
  height: 18px;
  fill: ${props => props.$isActive ? props.theme.Green500 : props.theme.Gray200};
  cursor: pointer;
  transition: fill 0.2s ease;
`;

const StyledStar = styled(StarIcon)<{ $isActive: boolean }>`
  width: 22px;
  height: 22px;
  fill: ${props => props.$isActive ? props.theme.Green500 : props.theme.Gray200};
  cursor: pointer;
  transition: fill 0.2s ease;
`;

const StyledArrow = styled(RightArrowIcon)`
  width: 15px;
  height: 15px;
  fill: ${theme.Gray700};
`;

const ReactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 3px;
  height: 24px;
  line-height: 1; 
  font-size: 12px;
`;

const Distance = styled.span`
  font-size: 40px;
  font-family: "Lalezar";
  display: flex;
  line-height: 1; 
  letter-spacing: -0.05em;
`;

interface PathCardProps {
  pathimage: string;
  pathname: string;
  registeredDate: string;
  hashtag: string;
  distance: string;  
  likeCount: number;
  starCount: number;
  reviewCount: number;
  isLiked: boolean;
  isStarred: boolean;
  onLikeClick: () => void;
  onStarClick: () => void;
}
function PathCard({
  pathimage, 
  pathname, 
  registeredDate, 
  hashtag, 
  distance, 
  likeCount, 
  starCount, 
  reviewCount,
  isLiked,
  isStarred,
  onLikeClick,
  onStarClick }: PathCardProps) {
  return (
    <Layout>
      <PathCardContainer>
        <PathInfoWrapper>
          <img
          src={pathimage}
            alt="산책로 이미지"
            style={{
              backgroundColor: "grey",
              width: 70,
              height: 70,
              borderRadius: 10,
            }}
          />

          <PathDescription>
            <TextWrapper>
              <span>{pathname}</span>
              <span>{registeredDate}</span>
            </TextWrapper>
            <span>{hashtag}</span>
          </PathDescription>
        </PathInfoWrapper>

        <UserReactionsWrapper>
          <ReactionContainer>
            <ReactionItem>
              <StyledHeart 
                $isActive={isLiked} 
                onClick={onLikeClick}
              />
              <span>{likeCount}</span>
            </ReactionItem>

            <ReactionItem>
              <StyledStar 
                $isActive={isStarred} 
                onClick={onStarClick}
              />
              <span>{starCount}</span>
            </ReactionItem>

              <ReactionItem>
                <span>리뷰 {reviewCount}개</span>
                <StyledArrow />
              </ReactionItem>
          </ReactionContainer>

          <Distance>{distance}</Distance>
        </UserReactionsWrapper>
      </PathCardContainer>
    </Layout>
  );
}

export default PathCard;