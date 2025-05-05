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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 15px 30px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    padding: 20px 40px;
    max-width: 1024px;
    margin: 0 auto;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    max-width: 100%;
    margin: 0 auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 1024px;
  }
`;

const HeaderTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 5px 0;
  }
`;

// 산책로 정보 컴포넌트 관련
const PathTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 5px 0px 5px 0px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 1.5rem;
    margin: 8px 0px 10px 0px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 1.75rem;
  }
`;

const PathDate = styled.div`
  color: ${theme.Green500};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 1.1rem;
    gap: 6px;
  }
`;

const PathInfoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PathDescription = styled.div`
  font-size: 13px;
  margin: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 15px;
    margin: 15px;
    line-height: 1.5;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

// 지도 관련
const MapSection = styled.div`
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    max-width: 100%;
    margin: 20px auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 900px;
  }
`;

const MapBox = styled.div`
  width: 100%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px 20px 0px 0px;
  height: 35vh;
  overflow: hidden;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    height: 40vh;
    border-radius: 24px 24px 0px 0px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    height: 45vh;
  }
`;

const MapDetailsContainer = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 10px 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    border-radius: 0px 0px 14px 14px;
  }
`;

// 유저 반응(좋아오, 별점, 리뷰) 관련
const ReactionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 15px;
  }
`;

const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 8px;
  }
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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 14px;
    margin-right: 4px;
  }
`;

// 해시태그 관련
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px;
  padding-bottom: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 8px;
    margin: 15px;
    padding-bottom: 15px;
  }
`;

const TagItem = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 2px;
  display: inline-block;
  white-space: nowrap;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 14px;
    margin: 3px;
  }
`;

// 별점 관련
const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 0 3px;
  }
`;

const RatingGroup = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: 13px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 15px;
    gap: 4px;
  }
`;

const RatingScore = styled.span`
  margin-right: 4px;
  color: ${theme.Gray700};

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin-right: 6px;
  }
`;

const StyledHeart = styled(HeartIcon)<{ $isActive: boolean }>`
  width: 15px;
  height: 15px;
  fill: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};
  cursor: pointer;
  transition: fill 0.2s ease;
  margin-right: 5px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 18px;
    height: 18px;
    margin-right: 7px;
  }
`;

const BookmarkButton = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    transform: scale(1.2);
  }
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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    min-height: 58px;
    font-size: 18px;
    margin-top: 24px;
    border-radius: 6px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 800px;
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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    min-height: 58px;
    font-size: 18px;
    margin-top: 14px;
    border-radius: 6px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 800px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 10px 0;
  }
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
