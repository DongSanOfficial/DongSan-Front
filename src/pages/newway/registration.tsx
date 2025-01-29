import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import DateDisplay from "src/components/newway_register/DateDisplay";
import TrailInfo from "src/components/newway_register/TrailInfo";
import ToggleSwitch from "src/components/newway_register/ToggleSwitch";
import InputField from "src/components/newway_register/InputField";
import PathMap from "../../components/map/PathMap";
import { drawPath } from "../../utils/drawPathUtils";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";

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
    props.isActive ? theme.Green500 : theme.Gray400};
  color: #ffffff;
  width: 100%;
  min-height: 52px;
  border: none;
  font-size: 16px;
  font-weight: 500;
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

const PathImagePreview = styled.img`
  width: 80vw;
  max-width: 322px;
  height: 30vh;
  max-height: 276px;
  margin-top: 20px;
  object-fit: contain;
`;

const PathMapContainer = styled.div`
  width: 100%;
  min-height: 300px;
  margin-bottom: 10px;
  border-radius: 15px;
  overflow: hidden;
`;

// 샘플 경로 데이터
const samplePathCoords = [
  { lat: 37.5665, lng: 126.978 },
  { lat: 37.5668, lng: 126.9785 },
  { lat: 37.5671, lng: 126.979 },
  { lat: 37.5675, lng: 126.9795 },
  { lat: 37.568, lng: 126.98 },
  { lat: 37.5683, lng: 126.9805 },
  { lat: 37.5685, lng: 126.981 },
];

interface PathData {
  coordinates: Array<{ lat: number; lng: number }>;
  totalDistance: number;
  duration: string;
  startTime: Date;
  endTime: Date;
}

export default function Registration() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [isEditMode, setIsEditMode] = useState(!!state); // state가 있으면 수정모드로 간주
  const [isTestMode, setIsTestMode] = useState(true);

  const [name, setName] = useState(state?.name || "");
  const [description, setDescription] = useState(state?.description || "");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [pathImage, setPathImage] = useState<string>("");

  const pathData: PathData = isTestMode
    ? {
        coordinates: samplePathCoords,
        totalDistance: 1.2,
        duration: "00:20",
        startTime: new Date(),
        endTime: new Date(),
      }
    : location.state;
  // 외부에서 해시태그가 넘어오는 경우 초기화
  useEffect(() => {
    if (state?.tags) {
      setTags(state.tags); // state에서 받은 tags 배열을 상태에 설정
    }
  }, [state?.tags]);
  useEffect(() => {
    const generatePathImage = async () => {
      const coords = isTestMode ? samplePathCoords : pathData.coordinates;
      const image = await drawPath(coords);
      setPathImage(image);
    };
    generatePathImage();
  }, [isTestMode, pathData.coordinates]);

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

  const handleSubmit = () => {
    if (isActive) {
      const submitData = {
        coordinates: pathData.coordinates,
        name,
        description,
        tags,
        pathImage,
        totalDistance: pathData.totalDistance,
        duration: pathData.duration,
        startTime: pathData.startTime,
        endTime: pathData.endTime,
      };

      console.log("등록 완료 시 전체 데이터:", {
        경로정보: submitData.coordinates,
        산책명: submitData.name,
        설명: submitData.description,
        해시태그: submitData.tags,
        총거리: submitData.totalDistance,
        소요시간: submitData.duration,
        이미지생성여부: !!submitData.pathImage,
      });
      navigate("/mypage/myregister/:walkwayId", { state: submitData });
    }
  };

  const toggleTestMode = () => {
    setIsTestMode(!isTestMode);
  };

  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="산책로 등록" />
      <Wrapper>
        <Button
          isActive={true}
          onClick={toggleTestMode}
          style={{ marginBottom: "10px" }}
        >
          {isTestMode ? "테스트 모드 ON" : "테스트 모드 OFF"}
        </Button>

        <ContentWrapper>
          <Content>
            <DateDisplay />
            <ToggleSwitch />
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
        <Button isActive={isActive} onClick={handleSubmit}>
          {isEditMode ? "수정완료" : "작성완료"}
        </Button>

        <PathImagePreview src={pathImage} alt="Path Preview" />
      </Wrapper>
      <BottomNavigation />
    </>
  );
}
