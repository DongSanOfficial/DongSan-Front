import { MainMap } from "../../components/map/MainMap";
import { useState } from "react";
import { BottomSheet } from "../../components/bottomsheet/BottomSheet";
import BottomSheetHeader from "./header/BottomSheetHeader";
import PathCard from "./components/PathCard";
import styled from "styled-components";


interface PathData {
  walkwayId: number;
  courseImageUrl: string;
  name: string;
  registerDate: string;
  hashtags: string[];
  distance: number;
  likeCount: number;
  isLike: boolean;
  rating: number;
  reviewCount: number;
  location: [number, number];
}

const BottomSheetContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FixedHeader = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const PathCardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px 0 70px 0;
  overflow-y: auto;
  flex: 1;
`;

const mockPathData: PathData[] = [
  {
    walkwayId: 1,
    courseImageUrl: "한국외대 근처 산책 스팟",
    name: "한국외대 근처 산책 스팟",
    registerDate: "2024.09.26",
    hashtags: ["#한국외대", "#자취생_산책로"],
    distance: 4.8,
    likeCount: 20,
    isLike: true,
    rating: 4.8,
    reviewCount: 15,
    location: [127.0525, 37.5965],
  },
  {
    walkwayId: 2,
    courseImageUrl: "서울숲 산책로",
    name: "서울숲 산책로",
    registerDate: "2024.09.25",
    hashtags: ["#서울숲", "#데이트코스"],
    distance: 3.2,
    likeCount: 45,
    isLike: false,
    rating: 4.9,
    reviewCount: 32,
    location: [127.0374, 37.5445],
  },
  {
    walkwayId: 3,
    courseImageUrl: "청계천 야경 산책",
    name: "청계천 야경 산책",
    registerDate: "2024.09.24",
    hashtags: ["#청계천", "#야간산책", "#도심"],
    distance: 5.1,
    likeCount: 67,
    isLike: true,
    rating: 4.7,
    reviewCount: 28,
    location: [127.0214, 37.5696],
  },
  {
    walkwayId: 4,
    courseImageUrl: "북악산 둘레길",
    name: "북악산 둘레길",
    registerDate: "2024.09.23",
    hashtags: ["#북악산", "#등산", "#자연"],
    distance: 6.5,
    likeCount: 89,
    isLike: false,
    rating: 4.6,
    reviewCount: 41,
    location: [126.9818, 37.5926],
  },
];

function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [likedPaths, setLikedPaths] = useState<{ [key: number]: boolean }>(
    Object.fromEntries(
      mockPathData.map((path) => [path.walkwayId, path.isLike])
    )
  );
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>(
    Object.fromEntries(
      mockPathData.map((path) => [path.walkwayId, path.likeCount])
    )
  );
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | undefined
  >(undefined);

  const handleLikeClick = (id: number) => {
    setLikedPaths((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: prev[id] + (likedPaths[id] ? -1 : 1),
    }));
  };

  const handlePathClick = (location: [number, number]) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <MainMap
        center={
          selectedLocation
            ? { lat: selectedLocation[1], lng: selectedLocation[0] }
            : undefined
        }
      />
      <BottomSheet
        isOpen={isOpen}
        height="85vh"
        initialHeight="30vh"
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <BottomSheetContainer>
          <FixedHeader>
            <BottomSheetHeader />
          </FixedHeader>
          <PathCardList>
            {mockPathData.map((path) => (
              <PathCard
                key={path.walkwayId}
                pathimage={path.courseImageUrl}
                pathname={path.name}
                registeredDate={path.registerDate}
                hashtag={path.hashtags.join(" ")}
                distance={`${path.distance} km`}
                likeCount={likeCounts[path.walkwayId]}
                starCount={path.rating}
                reviewCount={path.reviewCount}
                isLiked={likedPaths[path.walkwayId]}
                onLikeClick={() => handleLikeClick(path.walkwayId)}
                onClick={() => handlePathClick(path.location)}
              />
            ))}
          </PathCardList>
        </BottomSheetContainer>
      </BottomSheet>
    </>
  );
}

export default Main;
