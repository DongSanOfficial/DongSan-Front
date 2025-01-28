import styled from "styled-components";
import ToggleSwitch from "../newway_register/ToggleSwitch";
import TrailInfo from "../newway_register/TrailInfo";
import { ReactComponent as StarIcon } from "../../assets/svg/Star.svg";
import { ReactComponent as HeartIcon } from "../../assets/svg/Heart.svg";
import { MdArrowForwardIos } from "react-icons/md";
import { BiCalendarCheck } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "src/styles/colors/theme";
import PathMap from "../map/PathMap";

// 레이아웃 관련
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  align-items: center;
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
  @media (max-width: 375px) {
    width: 300px;
  }
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
  height: 100%;
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
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 10px 10px;
`;

// 유저 반응(좋아오, 별점, 리뷰) 관련
const ReactionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

interface ReactionButtonProps {
  active?: boolean;
}

const ReactionButton = styled.div<ReactionButtonProps>`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 3px;
  color: ${(props) => (props.active ? "red" : "black")};
`;

const EditButton = styled.button`
  background-color: #888;
  color: #ffffff;
  width: 100%;
  height: 3.25rem;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
`;

// 해시태그 관련
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 5px;
  margin: 10px;
  padding-bottom: 10px;
`;

const TagItem = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 2px;
  flex-shrink: 0;
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

const StarBox = styled.div`
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
    fill: ${({ isactive }) =>
      isactive === "true" ? theme.Yellow : theme.Gray100};
  }
`;

const PartialStar = styled(StyledStar)<{ width: number }>`
  clip-path: ${({ width }) => `inset(0 ${100 - width}% 0 0)`};
  path {
    fill: ${theme.Yellow};
  }
`;

const StyledHeart = styled(HeartIcon)<{ $isActive: boolean }>`
  width: 15px;
  height: 15px;
  fill: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};
  cursor: pointer;
  transition: fill 0.2s ease;
  margin-right: 3px;
`;

// 목데이터
const mockPathData = {
  pathId: 1,
  name: "홍대 문화거리 산책",
  date: "2024.01.28 오후 13:25",
  description:
    "홍대입구역에서 시작하는 문화예술 산책로입니다. 벽화, 조형물, 카페거리를 구경하며 걸을 수 있어요.",
  coordinates: [
    { lat: 37.557527, lng: 126.924191 },
    { lat: 37.557876, lng: 126.925864 },
    { lat: 37.558372, lng: 126.927152 },
    { lat: 37.559123, lng: 126.928397 },
    { lat: 37.560015, lng: 126.929556 },
    { lat: 37.561242, lng: 126.930629 },
    { lat: 37.562467, lng: 126.931584 },
    { lat: 37.563688, lng: 126.932453 },
  ],
  tags: ["홍대", "문화거리", "카페", "벽화", "데이트"],
  totalDistance: 2.1,
  duration: "00:35",
  statistics: {
    heartCount: 156,
    starCount: 4.8,
    reviewCount: 23,
    isHearted: false,
    isStarred: false,
  },
};

export default function PathDetails() {
  const navigate = useNavigate();
  const pathData = mockPathData;

  const [heartCount, setHeartCount] = useState<number>(
    pathData.statistics.heartCount
  );
  const [isHeartActive, setIsHeartActive] = useState<boolean>(
    pathData.statistics.isHearted
  );
  const [hashtags, setHashtags] = useState<String[]>(pathData.tags);

  const toggleHeart = (): void => {
    setIsHeartActive(!isHeartActive);
    setHeartCount((prev) => (isHeartActive ? prev - 1 : prev + 1));
  };

  const goToReviews = (): void => {
    navigate("/reviews/:walkwayId");
  };

  const handleEditClick = () => {
    navigate("/newway/registration", {
      state: {
        name: pathData.name,
        description: pathData.description,
        tags: pathData.tags,
        isEditMode: true,
      },
    });
  };

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((value) => {
      const diff = rating - (value - 1);
      const percentage = Math.min(Math.max(diff, 0), 1) * 100;

      return (
        <StarBox key={value}>
          <StyledStar isactive="false" />
          {percentage > 0 && <PartialStar width={percentage} isactive="true" />}
        </StarBox>
      );
    });
  };

  return (
    <PageWrapper>
      <HeaderContainer>
        {/* 날짜, 공개 토글 */}
        <HeaderTopBar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <BiCalendarCheck
              style={{ color: "black", width: "27px", height: "27px" }}
            />
            <PathDate>{pathData.date}</PathDate>
          </div>
          <ToggleSwitch />
        </HeaderTopBar>
        {/* 산책로 제목 */}
        <PathTitle>{pathData.name}</PathTitle>
        {/* 산책로 경과 시간, 거리 정보 */}
        <PathInfoContainer>
          <TrailInfo
            duration={pathData.duration}
            distance={pathData.totalDistance}
          />
        </PathInfoContainer>
      </HeaderContainer>
      {/* 지도를 포함한, 산책로 관련 유저 입력 정보 */}
      <MapSection>
        {/* 지도 */}
        <MapBox>
          <PathMap pathCoords={pathData.coordinates} />
        </MapBox>
        <MapDetailsContainer>
          {/* 좋아요, 별점, 리뷰 */}
          <ReactionBar>
            <ReactionButton>
              <StyledHeart $isActive={isHeartActive} onClick={toggleHeart} />
              {heartCount}
            </ReactionButton>
            <RatingContainer>
              <RatingGroup>
                {renderStars(pathData.statistics.starCount)}
                <RatingScore>
                  {pathData.statistics.starCount.toFixed(1)}
                </RatingScore>
                <span>리뷰 {pathData.statistics.reviewCount}개</span>
              </RatingGroup>
            </RatingContainer>
            <ReactionButton onClick={goToReviews}>
              <MdArrowForwardIos />
            </ReactionButton>
          </ReactionBar>
          {/* 산책로 부가설명, 태그 */}
          <PathDescription>{pathData.description}</PathDescription>
          <TagsContainer>
            {hashtags.map((hashtag, index) => (
              <TagItem key={index}> #{hashtag}</TagItem>
            ))}
          </TagsContainer>
        </MapDetailsContainer>
      </MapSection>
      {/* 수정하기 버튼 */}
      <EditButton onClick={handleEditClick}>수정하기</EditButton>
    </PageWrapper>
  );
}
