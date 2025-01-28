import React, { useState, ChangeEvent } from "react";
import { MainMap } from "../../components/map/MainMap";
import { BottomSheet } from "../../components/bottomsheet/BottomSheet";
import BottomSheetHeader from "./header/BottomSheetHeader";
import PathCard from "./components/PathCard";
import SearchBar from "./header/components/SearchInput";
import styled from "styled-components";
import SearchResults, { SearchResult } from "./components/SearchResult";
import BottomNavigation from "src/components/bottomNavigation";

const MainContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const SearchBarContainer = styled.div`
  position: fixed;
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
  overflow: scroll;
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

interface Location {
  lat: number;
  lng: number;
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
  const [isOpen, setIsOpen] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState("23vh");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searching, setSearching] = useState(false);
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
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [pathData, setPathData] = useState(mockPathData);

  /**
   * 검색 결과 처리
   * @param results - 검색 결과 배열
   */
  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    setSearching(false);
  };

  /**
   * 검색 결과 선택 처리
   * @param result - 선택된 검색 결과
   */
  const handleResultSelect = (result: SearchResult) => {
    setSelectedPath({
      location: [result.location.lng, result.location.lat],
      name: result.placeName,
    });
    setSearchResults([]);
    setSearchValue(result.placeName);
    setBottomSheetHeight("60vh");
    setIsOpen(true);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  /** 검색 수행 */
  const handleSearch = () => {
    if (searchValue.trim()) {
      setSearching(true);
    }
  };

  /**
   * 검색 완료 처리
   * @param location - 검색된 위치 좌표
   */
  const handleSearchComplete = (location: Location) => {
    setSearching(false);
    console.log("좌표 확인: ", location);
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
    <>
      <MainContainer>
        <SearchBarContainer>
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
          <SearchResults
            results={searchResults}
            onSelect={handleResultSelect}
          />
        </SearchBarContainer>

        <MainMap
          center={
            selectedPath
              ? { lat: selectedPath.location[1], lng: selectedPath.location[0] }
              : undefined
          }
          pathName={selectedPath?.name}
          searchKeyword={searching ? searchValue : undefined}
          onSearchResults={handleSearchResults}
        />
        <BottomSheet
          isOpen={isOpen}
          maxHeight="60vh"
          minHeight={bottomSheetHeight}
          onClose={() => {
            setIsOpen(false);
            setBottomSheetHeight("23vh");
          }}
          onOpen={() => setIsOpen(true)}
        >
          <BottomSheetContainer>
            <FixedHeader>
              <BottomSheetHeader />
            </FixedHeader>
            <PathCardList>
              {pathData.map((path) => (
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
      <BottomNavigation />
    </>
  );
}

export default Main;
