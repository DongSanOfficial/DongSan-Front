import S from "./register.styles";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DateDisplay from "src/pages/register/components/DateDisplay";
import TrailInfo from "src/pages/newway/components/TrailInfo";
import ToggleSwitch from "src/pages/register/components/ToggleSwitch";
import InputField from "src/pages/register/components/InputField";
import PathMap from "../../components/map/PathMap";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { createWalkway, updateWalkway } from "src/apis/walkway/walkway";
import Modal from "src/components/modal/Modal";
import { useToast } from "src/context/toast/useToast";
import { CreateWalkwayType, UpdateWalkwayType } from "src/apis/walkway/walkway.type";

interface PathData {
  coordinates: Array<{ lat: number; lng: number }>;
  totalDistance: number;
  duration: number;
  startTime: Date;
  endTime: Date;
  pathImage: string;
  courseImageId: number;
}

interface LocationState extends PathData {
  isEditMode?: boolean;
  walkwayId?: number;
  name?: string;
  date?: string;
  description?: string;
  hashtags?: string[];
  accessLevel?: "PRIVATE" | "PUBLIC";
}


export default function Registration() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { state } = location as { state: LocationState };
  // state.isEditMode를 직접 확인
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode || false);
  const [name, setName] = useState(state?.name || "");
  const [description, setDescription] = useState(state?.description || "");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [pathImage, setPathImage] = useState<string>("");
  const [accessLevel, setAccessLevel] = useState<"PRIVATE" | "PUBLIC">(
    state?.accessLevel || "PRIVATE"
  );
  const pathData: PathData = state;

  useEffect(() => {
    if (state?.hashtags) {
      setTags(state.hashtags);
    }
  }, []);

  useEffect(() => {
    if (pathData.pathImage) {
      setPathImage(pathData.pathImage);
    }
  }, [pathData.pathImage]);

  useEffect(() => {
    setIsActive(name.length > 0);
  }, [name, description]);

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // '#' 기호 제거 및 공백을 '_'로 대체
    const value = e.target.value.replace("#", "").replace(/\s/g, "_");
    if (value.length <= 10) {
      setTagInput(value);
    }
  };

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim();

      // 10자를 초과하는 태그는 추가하지 않음
      if (newTag.length <= 10 && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  // 태그 삭제 함수 추가
  const handleTagDelete = (indexToDelete: number) => {
    setTags(tags.filter((_, index) => index !== indexToDelete));
  };

  useEffect(() => {
    if (state?.hashtags) {
      setTags(state.hashtags);
    }
  }, [state?.hashtags]);

  const handleSubmit = async () => {
    if (isActive && !isLoading) {
      setIsLoading(true);
      console.log("수정 모드:", isEditMode);
      console.log("walkwayId:", state.walkwayId);

      try {
        if (isEditMode && state.walkwayId) {
          const updateData: UpdateWalkwayType = {
            name,
            memo: description,
            hashtags: tags.map((tag) =>
              tag.startsWith("#") ? tag.slice(1) : tag
            ),
            walkwayExposeLevel: accessLevel,
          };
          await updateWalkway(state.walkwayId, updateData);
          showToast("수정이 완료되었습니다.", "success");
          navigate(`/mypage/myregister/${state.walkwayId}`);
        } else {
          // 신규 등록일 경우
          const walkwayData: CreateWalkwayType = {
            courseImageId: pathData.courseImageId!,
            name,
            memo: description,
            distance: pathData.totalDistance,
            time: pathData.duration,
            hashtags: tags.map((tag) =>
              tag.startsWith("#") ? tag.slice(1) : tag
            ),
            walkwayExposeLevel: accessLevel,
            course: pathData.coordinates.map((coord) => ({
              latitude: coord.lat,
              longitude: coord.lng,
            })),
          };
          const walkwayId = await createWalkway(walkwayData);
          showToast("등록이 완료되었습니다.", "success");
          navigate(`/mypage/myregister/${walkwayId}`, {
            state: { from: "newRegistration" },
          });
        }
      } catch (error) {
        showToast("다시 한 번 시도해주세요.", "error");
        console.error(
          isEditMode ? "산책로 수정 실패:" : "산책로 등록 실패:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (isEditMode) {
      navigate(-1);
    } else {
      navigate("/main");
    }
  };

  return (
    <>
      <AppBar
        onBack={handleBackClick}
        title={isEditMode ? "산책로 수정" : "산책로 등록"}
      />
      <S.Wrapper>
        <S.ContentWrapper>
          <S.Content>
            <DateDisplay
              date={isEditMode && state.date ? state.date : undefined}
            />
            <ToggleSwitch
              isPublic={accessLevel === "PUBLIC"}
              readOnly={false}
              onChange={(isPublic) =>
                setAccessLevel(isPublic ? "PUBLIC" : "PRIVATE")
              }
            />
          </S.Content>
          <TrailInfo
            duration={pathData.duration}
            distance={pathData.totalDistance}
            isRegistration={true}
          />
        </S.ContentWrapper>
        <S.PathMapContainer>
          <PathMap pathCoords={pathData.coordinates} />
        </S.PathMapContainer>
        <InputField
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
        <S.TagInputWrapper>
          <S.TagInput
            placeholder={"해시태그 추가하기(각 10자이내)"}
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
          />
          <S.TagList>
            {tags.map((tag, index) => (
              <S.Tag key={index} onClick={() => handleTagDelete(index)}>
                #{tag}
                <S.DeleteIcon>×</S.DeleteIcon>
              </S.Tag>
            ))}
          </S.TagList>
        </S.TagInputWrapper>
        <S.Button isActive={isActive} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "처리 중..." : isEditMode ? "수정완료" : "작성완료"}
        </S.Button>
      </S.Wrapper>
      <BottomNavigation />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        message={`
            ${isEditMode ? "수정" : "등록"}을 취소하시겠습니까?
            작성 중인 정보는 저장되지 
            않습니다.
          `}
      />
    </>
  );
}