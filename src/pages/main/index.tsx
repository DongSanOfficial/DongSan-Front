import React, { useState, ChangeEvent } from 'react';
import { MainMap } from "../../components/map/MainMap";
import { BottomSheet } from "../../components/bottomsheet/BottomSheet";
import BottomSheetHeader from "./header/BottomSheetHeader";
import PathCard from "./components/PathCard";
import SearchBar from "./header/components/SearchInput";
import styled from "styled-components";

const MainContainer = styled.div`
  position: relative;
  height: 100dvh;
  width: 100%;
`;

const SearchBarContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  width: 90%;
  z-index: 10;
`;

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
  const [isOpen, setIsOpen] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedPath, setSelectedPath] = useState<{
    location: [number, number];
    name: string;
  } | null>(null);
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

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

  const handlePathClick = (location: [number, number], name: string) => {
    setSelectedPath({ location, name });
    setIsOpen(false);
  };

  return (
    <MainContainer>
      <SearchBarContainer>
        <SearchBar value={searchValue} onChange={handleSearchChange} />
      </SearchBarContainer>
      
      <MainMap
        center={
          selectedPath
            ? { lat: selectedPath.location[1], lng: selectedPath.location[0] }
            : undefined
        }
        pathName={selectedPath?.name}
      />
      <BottomSheet
        isOpen={isOpen}
        maxHeight="85vh"
        minHeight="20vh"
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
                hashtag={path.hashtags.join(" ")}
                distance={`${path.distance} km`}
                starCount={path.rating}
                reviewCount={path.reviewCount}
                isLiked={likedPaths[path.walkwayId]}
                onLikeClick={() => handleLikeClick(path.walkwayId)}
                onClick={() => handlePathClick(path.location, path.name)}
              />
            ))}
          </PathCardList>
        </BottomSheetContainer>
      </BottomSheet>
    </MainContainer>
  );
}

export default Main;