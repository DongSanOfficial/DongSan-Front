import React, { useState, ChangeEvent, useEffect } from "react";
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
import { searchWalkways, getWalkwayDetail } from "../../apis/walkway";
import { ApiErrorResponse } from "src/apis/api.type";
import GuideButton from "src/components/button/GuideButton";
import { useNavigate } from "react-router-dom";
import { toggleLike } from "src/apis/likedWalkway";
import { useLocationStore } from "../../store/useLocationStore";
import { MdOutlineInbox } from "react-icons/md";

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
  max-width: 400px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
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

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
`;

const IconWrapper = styled.div`
  background-color: ${theme.Gray100};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const NoWalkwaysMessage = styled.p`
  font-size: 16px;
  color: ${theme.Gray700};
  text-align: center;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
`;

interface Location {
  lat: number;
  lng: number;
}

function Main() {
  const navigate = useNavigate();
  const { currentLocation, getCurrentLocation } = useLocationStore();

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

  // 선택된 산책로의 경로 상태
  const [selectedPath, setSelectedPath] = useState<Location[]>([]);

  // 좋아요 상태
  const [likedPaths, setLikedPaths] = useState<{ [key: number]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});

  // 산책로 id
  const [selectedWalkwayId, setSelectedWalkwayId] = useState<number | null>(
    null
  );

  /**
   * 컴포넌트 마운트 시 현재 위치 가져오기
   */
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const location = await getCurrentLocation();
        if (location && !selectedLocation) {
          await fetchWalkways(location.lat, location.lng, sortOption, true);
          setSelectedLocation({
            latitude: location.lat,
            longitude: location.lng,
            name: "현재 위치",
          });
        }
      } catch (error) {
        console.error("위치 정보 초기화 실패:", error);
      }
    };

    initializeLocation();
  }, []);

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
        reset ? response.data : [...prev, ...response.data]
      );
      setHasMore(response.hasNext);

      if (response.data.length > 0) {
        const newLastId = response.data[response.data.length - 1]?.walkwayId;
        setLastId(newLastId);
      }

      if (reset) {
        const newLikedPaths = Object.fromEntries(
          response.data.map((data) => [data.walkwayId, data.isLike])
        );
        const newLikeCounts = Object.fromEntries(
          response.data.map((data) => [data.walkwayId, data.likeCount])
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

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    setSearching(false);
  };

  const handleResultSelect = async (result: SearchResult) => {
    setSelectedLocation({
      latitude: result.location.lat,
      longitude: result.location.lng,
      name: result.placeName,
    });
    setSelectedWalkwayId(null);
    setSelectedPath([]); // 경로 초기화
    setSearchResults([]);
    setSearchValue(result.placeName);
    setIsOpen(false);

    await fetchWalkways(
      result.location.lat,
      result.location.lng,
      sortOption,
      true
    );
  };

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
  const handleInitialLocation = async (location: Location) => {
    try {
      await fetchWalkways(location.lat, location.lng, sortOption, true);
      setSelectedLocation({
        latitude: location.lat,
        longitude: location.lng,
        name: "현재 위치",
      });
      setSelectedPath([]); // 경로 초기화
      setBottomSheetHeight("23vh");
      setIsOpen(false);
    } catch (error) {
      console.error("현재 위치 기반 산책로 조회 실패:", error);
    }
  };

  /**
   * 위치 버튼 클릭 처리
   */
  const handleLocationButtonClick = async (location: Location) => {
    try {
      await fetchWalkways(location.lat, location.lng, sortOption, true);
      setSelectedLocation({
        latitude: location.lat,
        longitude: location.lng,
        name: "현재 위치",
      });
      setSelectedPath([]); // 경로 초기화
      setSearchValue("");
    } catch (error) {
      console.error("현재 위치 기반 산책로 조회 실패:", error);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
      if (selectedLocation) {
        fetchWalkways(
          selectedLocation.latitude,
          selectedLocation.longitude,
          sortOption
        );
      }
    }
  };
  /**
   * 좋아요 클릭 처리
   */
  const handleLikeClick = async (id: number) => {
    try {
      const isLiked = likedPaths[id]; // 현재 좋아요 상태

      const response = await toggleLike({
        walkwayId: id,
        isLiked: isLiked,
      });
      // likedPaths와 likeCounts를 이전 상태 기반으로 업데이트
      setLikedPaths((prev) => {
        return { ...prev, [id]: !prev[id] };
      });

      setLikeCounts((prev) => {
        return { ...prev, [id]: prev[id] + (likedPaths[id] ? -1 : 1) };
      });
    } catch (error) {
      console.log("좋아요 처리실패: ", error);
    }
  };

  /**
   * 산책로 카드 클릭 처리
   */
  const handlePathClick = async (
    walkwayId: number,
    location: { latitude: number; longitude: number },
    name: string
  ) => {
    try {
      // 단건 조회 API를 호출하여 course 정보를 가져옴
      const detailData = await getWalkwayDetail(walkwayId);

      // course 데이터를 kakao maps 형식에 맞게 변환
      const pathCoords = detailData.course.map((coord) => ({
        lat: coord.latitude,
        lng: coord.longitude,
      }));

      setSelectedPath(pathCoords);
      setSelectedLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        name: name,
      });
      setSelectedWalkwayId(walkwayId);
      setIsOpen(false);
    } catch (error) {
      console.error("산책로 상세 정보 조회 실패:", error);
    }
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
      setSelectedPath([]); // 경로 초기화
      setIsOpen(false);

      await fetchWalkways(location.lat, location.lng, sortOption, true);
    } catch (error) {
      console.error("선택 위치 기반 산책로 조회 실패:", error);
    }
  };

  return (
    <>
      <MainContainer>
        <SearchBarContainer>
          <GuideButton onClick={() => navigate("/guide")} />
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
          <SearchResults
            results={searchResults}
            onSelect={handleResultSelect}
            onOutsideClick={() => setSearchResults([])}
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
          pathCoords={selectedPath}
          searchKeyword={searching ? searchValue : undefined}
          onSearchResults={handleSearchResults}
          onInitialLocation={handleInitialLocation}
          onLocationButtonClick={handleLocationButtonClick}
          onSearchCurrentLocation={handleSearchCurrentLocation}
        />

        <BottomSheet
          isOpen={isOpen}
          maxHeight="80vh"
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
                    distance={`${walkway.distance} km`}
                    starCount={walkway.rating}
                    reviewCount={walkway.reviewCount}
                    isLiked={likedPaths[walkway.walkwayId] || false}
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
                  <>
                    <EmptyStateContainer>
                      <IconWrapper>
                        <MdOutlineInbox size={40} color={theme.Gray500} />
                      </IconWrapper>
                      <NoWalkwaysMessage>
                        전방 500m 부근에 등록된 산책로가 없습니다.
                      </NoWalkwaysMessage>
                    </EmptyStateContainer>
                  </>
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
