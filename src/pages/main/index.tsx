import React, { useState, ChangeEvent, useEffect } from "react";
import { AxiosError } from "axios";
import S from "./main.styles";
import { MainMap } from "../../components/map/MainMap";
import BottomSheet from "../../components/bottomsheet/BottomSheet";
import BottomSheetHeader from "./components/BottomSheetHeader";
import PathCard from "../../components/card/PathCard";
import SearchResults, { SearchResult } from "./components/SearchResult";
import BottomNavigation from "src/components/bottomNavigation";
import { theme } from "src/styles/colors/theme";
import {
  Walkway,
  SortOption,
  MapOption,
} from "../../apis/walkway/walkway.type";
import {
  searchWalkways,
  getWalkwayDetail,
  getAllWalkways,
  toggleLike,
} from "../../apis/walkway/walkway";
import { ApiErrorResponse } from "src/apis/api.type";
import GuideButton from "src/components/button/GuideButton";
import { useNavigate } from "react-router-dom";
import { useLocationStore } from "../../store/useLocationStore";
import { MdOutlineInbox } from "react-icons/md";
import SearchBar from "./components/SearchInput";

interface Location {
  lat: number;
  lng: number;
}

function Main() {
  const navigate = useNavigate();
  const { currentLocation, getCurrentLocation } = useLocationStore();
  // 바텀시트 상태
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleBottomSheet = () => setIsOpen((prev) => !prev);

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
  const [mapOption, setMapOption] = useState<MapOption>("all");
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
        if (location) {
          setSelectedLocation({
            latitude: location.lat,
            longitude: location.lng,
            name: "현재 위치",
          });
        }
        await fetchAllWalkways(sortOption, true);
      } catch (error) {
        console.error("위치 정보 초기화 실패:", error);
      }
    };

    initializeLocation();
  }, []);

  /**
   * 모든 산책로 조회 API 연동
   */
  const fetchAllWalkways = async (sort: SortOption, reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllWalkways({
        sort,
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
        "모든 산책로를 불러오는데 실패했습니다.";
      setError(errorMessage);
      console.error("모든 산책로 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 산책로 검색 api 연동 (위치 기반)
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
    setMapOption("current");
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
    setIsOpen(false);

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

    if (mapOption === "current" && selectedLocation) {
      await fetchWalkways(
        selectedLocation.latitude,
        selectedLocation.longitude,
        newSortOption,
        true
      );
    } else {
      await fetchAllWalkways(newSortOption, true);
    }
  };

  /**
   * 지도 옵션 변경 처리
   */
  const handleMapChange = async (value: string) => {
    const newMapOption = value as MapOption;
    setMapOption(newMapOption);

    if (newMapOption === "current") {
      if (selectedLocation) {
        // 현재 위치 기반 산책로 조회
        await fetchWalkways(
          selectedLocation.latitude,
          selectedLocation.longitude,
          sortOption,
          true
        );
      } else {
        // 선택된 위치가 없으면 현재 위치 가져오기
        try {
          const location = await getCurrentLocation();
          if (location) {
            await fetchWalkways(location.lat, location.lng, sortOption, true);
            setSelectedLocation({
              latitude: location.lat,
              longitude: location.lng,
              name: "현재 위치",
            });
          }
        } catch (error) {
          console.error("현재 위치 가져오기 실패:", error);
        }
      }
    } else {
      // 모든 산책로 조회
      await fetchAllWalkways(sortOption, true);
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
      // 위치 버튼 클릭 시 mapOption을 current로 변경
      setMapOption("current");
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
      if (mapOption === "current" && selectedLocation) {
        fetchWalkways(
          selectedLocation.latitude,
          selectedLocation.longitude,
          sortOption
        );
      } else {
        fetchAllWalkways(sortOption);
      }
    }
  };

  /**
   * 좋아요 클릭 처리
   */
  const handleLikeClick = async (id: number) => {
    try {
      const isLiked = likedPaths[id]; // 현재 좋아요 상태

      await toggleLike({
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
      // 검색 위치 선택 시 mapOption을 current로 변경
      setMapOption("current");
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
      <S.MainContainer>
        <S.SearchBarContainer>
          <GuideButton onClick={() => navigate("/guide")} />
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            leftIcon={true}
            inputStyle={{
              border: "2px solid #188163",
              borderRadius: "2rem",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <SearchResults
            results={searchResults}
            onSelect={handleResultSelect}
            onOutsideClick={() => setSearchResults([])}
          />
        </S.SearchBarContainer>

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
          onClose={toggleBottomSheet}
          height="75vh"
          minHeight="180px"
          showPreview={true}
          closeOnOutsideClick={true}
        >
          <S.BottomSheetContainer>
            <S.FixedHeader>
              <BottomSheetHeader
                sortValue={sortOption}
                mapValue={mapOption}
                onSortChange={handleSortChange}
                onMapChange={handleMapChange}
              />
            </S.FixedHeader>
            <S.PathCardList onScroll={handleScroll}>
              {error ? (
                <S.ErrorMessage>{error}</S.ErrorMessage>
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
                    <S.EmptyStateContainer>
                      <S.IconWrapper>
                        <MdOutlineInbox size={40} color={theme.Gray500} />
                      </S.IconWrapper>
                      <S.NoWalkwaysMessage>
                        {mapOption === "current"
                          ? "전방 500m 부근에 등록된 산책로가 없습니다."
                          : "등록된 산책로가 없습니다."}
                      </S.NoWalkwaysMessage>

                      {/* 현재 위치 모드에서만 버튼 표시 */}
                      {mapOption === "current" && (
                        <S.ViewAllButton
                          onClick={() => {
                            setMapOption("all");
                            fetchAllWalkways(sortOption, true);
                          }}
                        >
                          동산의 모든 산책로 둘러보기
                        </S.ViewAllButton>
                      )}
                    </S.EmptyStateContainer>
                  </>
                )
              )}
              {loading && <S.LoadingSpinner />}
            </S.PathCardList>
          </S.BottomSheetContainer>
        </BottomSheet>
      </S.MainContainer>
      <BottomNavigation />
    </>
  );
}

export default Main;
