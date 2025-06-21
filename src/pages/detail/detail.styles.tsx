import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import { ReactComponent as HeartIcon } from "../../assets/svg/Heart.svg";

// 레이아웃 관련
const PageWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// 산책로 정보 컴포넌트 관련
const PathTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 5px 0px 5px 0px;
`;

const PathDate = styled.div`
  color: ${theme.Green500};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PathInfoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PathDescription = styled.div`
  font-size: 13px;
  margin: 10px;
`;

// 지도 관련
const MapSection = styled.div`
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
  width: 100%;
`;

const MapBox = styled.div`
  width: 100%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px 20px 0px 0px;
  height: 35vh;
  overflow: hidden;
`;

const MapDetailsContainer = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 10px 10px;
`;

// 유저 반응(좋아오, 별점, 리뷰) 관련
const ReactionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

interface ReactionButtonProps {
  active?: boolean;
}

const ReactionButton = styled.div<ReactionButtonProps>`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 2px;
  color: ${(props) => (props.active ? "red" : "black")};
`;

// 해시태그 관련
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px;
  padding-bottom: 10px;
`;

const TagItem = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 2px;
  display: inline-block;
  white-space: nowrap;
`;

// 별점 관련
const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RatingGroup = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: 13px;
`;

const RatingScore = styled.span`
  margin-right: 4px;
  color: ${theme.Gray700};
`;

const StyledHeart = styled(HeartIcon)<{ $isActive: boolean }>`
  width: 15px;
  height: 15px;
  fill: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};
  cursor: pointer;
  transition: fill 0.2s ease;
  margin-right: 5px;
`;

const BookmarkButton = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};
`;

const EditButton = styled.button<{ isDelete?: boolean }>`
  background-color: ${(props) =>
    props.isDelete ? theme.White : theme.Gray400};
  color: ${(props) => (props.isDelete ? theme.Red400 : theme.White)};
  width: 100%;
  min-height: 52px;
  box-sizing: border-box;
  border: ${(props) => (props.isDelete ? "1.5px solid" : "none")};
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isDelete ? theme.Gray100 : theme.Gray500};
  }
`;

// 리뷰 작성하기 버튼
const ReviewButton = styled.button`
  background-color: ${theme.Green500};
  color: #ffffff;
  width: 100%;
  min-height: 52px;
  box-sizing: border-box;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.Green600};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const S = {
  PageWrapper,
  HeaderContainer,
  HeaderTopBar,
  PathTitle,
  PathDate,
  PathInfoContainer,
  PathDescription,
  MapSection,
  MapBox,
  MapDetailsContainer,
  ReactionBar,
  LeftIcon,
  ReactionButton,
  TagsContainer,
  TagItem,
  RatingContainer,
  RatingGroup,
  RatingScore,
  StyledHeart,
  BookmarkButton,
  EditButton,
  ReviewButton,
  ButtonContainer,
};

export default S;
