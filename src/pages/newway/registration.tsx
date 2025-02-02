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
import { createWalkway } from "src/apis/walkway";

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

interface PathData {
  coordinates: Array<{ lat: number; lng: number }>;
  totalDistance: number;
  duration: number;
  startTime: Date;
  endTime: Date;
  pathImage: string;
  courseImageId: number;
}

export default function Registration() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  // state.isEditMode를 직접 확인
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode || false);
  const [name, setName] = useState(state?.name || "");
  const [description, setDescription] = useState(state?.description || "");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [pathImage, setPathImage] = useState<string>("");
  const [accessLevel, setAccessLevel] = useState<"PRIVATE" | "PUBLIC">(
    "PRIVATE"
  );

  const pathData: PathData = location.state;

  useEffect(() => {
    if (state?.tags) {
      setTags(state.tags);
    }
  }, [state?.tags]);

  useEffect(() => {
    if (pathData.pathImage) {
      setPathImage(pathData.pathImage);
    }
  }, [pathData.pathImage]);

  useEffect(() => {
    console.log("전달받은 pathData:", pathData);
    console.log("전달받은 이미지:", pathData?.pathImage?.substring(0, 100));

    if (pathData?.pathImage) {
      setPathImage(pathData.pathImage);
    }
  }, [pathData, pathData.pathImage]);

  useEffect(() => {
    setIsActive(name.length > 0);
  }, [name, description]);

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
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

      try {
        const walkwayData = {
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

        console.log("등록 완료 시 전체 데이터:", {
          경로정보: walkwayData.course,
          산책명: walkwayData.name,
          설명: walkwayData.memo,
          해시태그: walkwayData.hashtags,
          총거리: walkwayData.distance,
          소요시간: walkwayData.time,
          이미지ID: walkwayData.courseImageId,
          공개여부: walkwayData.exposeLevel,
        });

        navigate(`/mypage/myregister/${walkwayId}`);
      } catch (error) {
        console.error("산책로 등록 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="산책로 등록" />
      <Wrapper>
        <ContentWrapper>
          <Content>
            <DateDisplay />
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
          {isLoading ? "등록 중..." : isEditMode ? "수정완료" : "작성완료"}
        </Button>
        확인용 배포시 삭제
        <CourseImage src={pathImage} alt="경로 이미지화" />
      </Wrapper>
      <BottomNavigation />
    </>
  );
}
