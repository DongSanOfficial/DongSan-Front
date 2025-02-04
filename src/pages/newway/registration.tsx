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
  width: 100%;
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

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  width: 90%;
`;

const Tag = styled.span`
  font-size: 12px;
  color: #b4b4b4;
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
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && tagInput.trim() !== "") {
      const newTag = tagInput.trim().replace('#', '');
      setTags([...tags, newTag]);
      setTagInput("");
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

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
            hashtags: tags,
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
            hashtags: tags,
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
          <DateDisplay date={isEditMode && state.date ? state.date : undefined} />
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
            distance={pathData.totalDistance}
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
            placeholder={"#해시태그 추가하기"}
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
          />
          <TagList>
            {tags.map((tag, index) => (
              <Tag key={index}> #{tag}</Tag>
            ))}
          </TagList>
        </TagInputWrapper>
        <Button isActive={isActive} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "처리 중..." : isEditMode ? "수정완료" : "작성완료"}
        </Button>
        확인용 배포시 삭제
        <CourseImage src={pathImage} alt="경로 이미지화" />
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
