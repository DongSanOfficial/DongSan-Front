import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { AxiosError } from "axios";
import { MainMap } from "../../components/map/MainMap";
import { BottomSheet } from "../../components/bottomsheet/BottomSheet";
import BottomSheetHeader from "./header/BottomSheetHeader";
import PathCard from "./components/PathCard";
import SearchBar from "./header/components/SearchInput";
import SearchResults, { SearchResult } from "./components/SearchResult";
import BottomNavigation from "src/components/bottomNavigation";
import { theme } from "src/styles/colors/theme";
import { Walkway, SortOption } from "../../apis/walkway.type";
import { searchWalkways } from "../../apis/walkway";
import { ApiErrorResponse } from "src/apis/api.type";
import { useToast } from "src/hooks/useToast";

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

const NoWalkwaysMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${theme.Gray500};
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${theme.Black};
  font-size: 1rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 1rem;
`;

/**
 * 위치 정보 인터페이스
 */
interface Location {
  lat: number;
  lng: number;
}

function Main() {
  // 바텀시트 상태
  const [isOpen, setIsOpen] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState("23vh");

  // 검색 관련 상태
  const [searchValue, setSearchValue] = useState<string>("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // 위치 관련 상태
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    name: string;
  } | null>(null);

  // 산책로 데이터 관련 상태
  const [walkways, setWalkways] = useState<Walkway[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("liked");
  const [lastId, setLastId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 좋아요 상태
  const [likedPaths, setLikedPaths] = useState<{ [key: number]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});

  // 산책로 id
  const [selectedWalkwayId, setSelectedWalkwayId] = useState<number | null>(
    null
  );

  /**
   * 산책로 검색 api 연동
   */
  const fetchWalkways = async (
    lat: number,
    lng: number,
    sort: SortOption,
    reset: boolean = false
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await searchWalkways({
        sort,
        latitude: lat,
        longitude: lng,
        distance: 0.4,
        lastId: reset ? null : lastId,
        size: 10,
      });

      setWalkways((prev) =>
        reset ? response.walkways : [...prev, ...response.walkways]
      );
      setHasMore(response.hasNext);
      if (response.walkways.length > 0) {
        setLastId(response.walkways[response.walkways.length - 1]?.walkwayId);
      }

      // 좋아요 상태 초기화
      if (reset) {
        const newLikedPaths = Object.fromEntries(
          response.walkways.map((walkway) => [
            walkway.walkwayId,
            walkway.isLike,
          ])
        );
        const newLikeCounts = Object.fromEntries(
          response.walkways.map((walkway) => [
            walkway.walkwayId,
            walkway.likeCount,
          ])
        );
        setLikedPaths(newLikedPaths);
        setLikeCounts(newLikeCounts);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "산책로를 불러오는데 실패했습니다.";
      setError(errorMessage);
      console.error("산책로 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 검색 결과 처리
   */
  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    setSearching(false);
  };

  /**
   * 검색 결과 선택 처리
   */
  const handleResultSelect = async (result: SearchResult) => {
    setSelectedLocation({
      latitude: result.location.lat,
      longitude: result.location.lng,
      name: result.placeName,
    });
    setSelectedWalkwayId(null);
    setSearchResults([]);
    setSearchValue(result.placeName);
    setSelectedWalkwayId(null);
    setBottomSheetHeight("60vh");
    setIsOpen(true);

    await fetchWalkways(
      result.location.lat,
      result.location.lng,
      sortOption,
      true
    );
  };

  /**
   * 검색어 변경 처리
   */
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  /**
   * 검색 실행
   */
  const handleSearch = () => {
    if (searchValue.trim()) {
      setSearching(true);
    }
  };

  /**
   * 정렬 옵션 변경 처리
   */
  const handleSortChange = async (value: string) => {
    const newSortOption = value as SortOption;
    setSortOption(newSortOption);

    if (selectedLocation) {
      await fetchWalkways(
        selectedLocation.latitude,
        selectedLocation.longitude,
        newSortOption,
        true
      );
    }
  };

  /**
   * 초기 위치 설정 시 처리
   */
  const handleInitialLocation = async (location: {
    lat: number;
    lng: number;
  }) => {
    try {
      await fetchWalkways(location.lat, location.lng, sortOption, true);
      setSelectedLocation({
        latitude: location.lat,
        longitude: location.lng,
        name: "현재 위치",
      });
      setBottomSheetHeight("23vh");
      setIsOpen(false);
    } catch (error) {
      console.error("현재 위치 기반 산책로 조회 실패:", error);
    }
  };

  /**
   * 위치 버튼 클릭 처리
   */
  const handleLocationButtonClick = async (location: {
    lat: number;
    lng: number;
  }) => {
    try {
      await fetchWalkways(location.lat, location.lng, sortOption, true);
      setSelectedLocation({
        latitude: location.lat,
        longitude: location.lng,
        name: "현재 위치",
      });
    } catch (error) {
      console.error("현재 위치 기반 산책로 조회 실패:", error);
    }
  };

  /**
   * 무한 스크롤 처리
   */
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
      fetchWalkways(
        selectedLocation!.latitude,
        selectedLocation!.longitude,
        sortOption
      );
    }
  };

  /**
   * 좋아요 클릭 처리
   */
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

  /**
   * 산책로 카드 클릭 처리
   */
  const handlePathClick = (
    walkwayId: number,
    location: { latitude: number; longitude: number },
    name: string
  ) => {
    setSelectedLocation((prevLocation) => ({
      ...prevLocation!,
      latitude: location.latitude,
      longitude: location.longitude,
      name: name,
    }));
    setSelectedWalkwayId(walkwayId); 
    setIsOpen(false);
  };

  const handleSearchCurrentLocation = async (location: Location) => {
    try {
      // API 호출과 selectedLocation 업데이트를 동시에 실행
      setSelectedLocation({
        latitude: location.lat,
        longitude: location.lng,
        name: "선택한 위치",
      });
      setSelectedWalkwayId(null);
      setBottomSheetHeight("60vh");
      setIsOpen(true);

      await fetchWalkways(location.lat, location.lng, sortOption, true);
    } catch (error) {
      console.error("선택 위치 기반 산책로 조회 실패:", error);
    }
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
            selectedLocation
              ? {
                  lat: selectedLocation.latitude,
                  lng: selectedLocation.longitude,
                }
              : undefined
          }
          pathName={selectedLocation?.name}
          walkwayId={selectedWalkwayId}
          searchKeyword={searching ? searchValue : undefined}
          onSearchResults={handleSearchResults}
          onInitialLocation={handleInitialLocation}
          onLocationButtonClick={handleLocationButtonClick}
          onSearchCurrentLocation={handleSearchCurrentLocation}
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
              <BottomSheetHeader
                sortValue={sortOption}
                onSortChange={handleSortChange}
              />
            </FixedHeader>
            <PathCardList onScroll={handleScroll}>
              {error ? (
                <ErrorMessage>{error}</ErrorMessage>
              ) : walkways.length > 0 ? (
                walkways.map((walkway) => (
                  <PathCard
                    key={walkway.walkwayId}
                    walkwayId={walkway.walkwayId}
                    pathimage={walkway.courseImageUrl}
                    pathname={walkway.name}
                    hashtag={walkway.hashtags.join(" ")}
                    distance={`${walkway.distance.toFixed(1)} km`}
                    starCount={walkway.rating}
                    reviewCount={walkway.reviewCount}
                    isLiked={walkway.isLike}
                    onLikeClick={() => handleLikeClick(walkway.walkwayId)}
                    onClick={() =>
                      handlePathClick(
                        walkway.walkwayId,
                        walkway.location,
                        walkway.name
                      )
                    }
                  />
                ))
              ) : (
                !loading && (
                  <NoWalkwaysMessage>
                    전방 500m 부근에 등록된 산책로가 없습니다.
                  </NoWalkwaysMessage>
                )
              )}
              {loading && <LoadingSpinner />}
            </PathCardList>
          </BottomSheetContainer>
        </BottomSheet>
      </MainContainer>
      <BottomNavigation />
    </>
  );
}

export default Main;
