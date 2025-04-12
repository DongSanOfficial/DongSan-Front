import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import DateDisplay from "src/components/newway_register/DateDisplay";
import TrailInfo from "src/components/newway_register/TrailInfo";
import ToggleSwitch from "src/components/newway_register/ToggleSwitch";
import InputField from "src/components/newway_register/InputField";
import PathMap from "../../components/map/PathMap";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import CourseImage from "src/components/map/CourseImage";
import { createWalkway, updateWalkway } from "src/apis/walkway";
import ConfirmationModal from "src/components/modal/ConfirmationModal";
import { useToast } from "src/hooks/useToast";
import { CreateWalkwayType, UpdateWalkwayType } from "src/apis/walkway.type";

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

const Wrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.disabled
      ? theme.Gray400
      : props.isActive
      ? theme.Green500
      : theme.Gray400};
  color: #ffffff;
  width: 100%;
  min-height: 52px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

const TagInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 4px;
  width: 80vw;
  max-width: 322px;
  margin-bottom: 20px;
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  width: 90%;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background-color: ${theme.Gray400};
  color: white;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  gap: 4px;

  &:hover {
    opacity: 0.9;
  }
`;

const DeleteIcon = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const PathMapContainer = styled.div`
  width: 100%;
  min-height: 300px;
  margin-bottom: 10px;
  border-radius: 15px;
  overflow: hidden;
`;

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
    const value = e.target.value.replace("#", "").replace(/\s/g, "_"); // 모든 공백을 '_'로 대체
    setTagInput(value);
  };

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim();

      // 중복 태그 방지
      if (!tags.includes(newTag)) {
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
            exposeLevel: accessLevel,
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
            exposeLevel: accessLevel,
            course: pathData.coordinates.map((coord) => ({
              latitude: coord.lat,
              longitude: coord.lng,
            })),
          };
          const walkwayId = await createWalkway(walkwayData);
          showToast("등록이 완료되었습니다.", "success");
          navigate(`/mypage/myregister/${walkwayId}`);
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
      />{" "}
      <Wrapper>
        <ContentWrapper>
          <Content>
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
          </Content>
          <TrailInfo
            duration={pathData.duration}
            distance={pathData.totalDistance}  // 여기서는 이미 km 단위로 받은 값을 그대로 전달함
            isRegistration={true}
          />
        </ContentWrapper>
        <PathMapContainer>
          <PathMap pathCoords={pathData.coordinates} />
        </PathMapContainer>
        <InputField
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
        <TagInputWrapper>
          <TagInput
            placeholder={"해시태그 추가하기"}
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
          />
          <TagList>
            {tags.map((tag, index) => (
              <Tag key={index} onClick={() => handleTagDelete(index)}>
                #{tag}
                <DeleteIcon>×</DeleteIcon>
              </Tag>
            ))}
          </TagList>
        </TagInputWrapper>
        <Button isActive={isActive} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "처리 중..." : isEditMode ? "수정완료" : "작성완료"}
        </Button>
      </Wrapper>
      <BottomNavigation />
      <ConfirmationModal
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
