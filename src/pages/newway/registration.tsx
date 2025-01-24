import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import DateDisplay from "src/components/newway_register/DateDisplay";
import TrailInfo from "src/components/newway_register/TrailInfo";
import ToggleSwitch from "src/components/newway_register/ToggleSwitch";
import InputField from "src/components/newway_register/InputField";
import PathMap from "../../components/map/PathMap";
import { drawPath } from "../../utils/drawPathUtils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? theme.Green500 : theme.Gray400)};
  color: #ffffff;
  width: 356px;
  height: 52px;
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

const samplePathCoords: [number, number][] = [
  [37.5665, 126.9780],
  [37.5668, 126.9785],
  [37.5671, 126.9790],
  [37.5675, 126.9795],
  [37.5680, 126.9800],
  [37.5683, 126.9805],
  [37.5685, 126.9810]
];

interface PathData {
  coordinates: [number, number][];
  totalDistance: number;
  duration: string;
  startTime: Date;
  endTime: Date;
}

export default function Registration() {
  const location = useLocation();
  const [isTestMode, setIsTestMode] = useState(true);
  
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [pathImage, setPathImage] = useState<string>("");

  const pathData: PathData = isTestMode ? {
    coordinates: samplePathCoords,
    totalDistance: 1.2,
    duration: "00:20",
    startTime: new Date(),
    endTime: new Date()
  } : location.state;

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
        endTime: pathData.endTime
      };
      
      console.log('Submit data:', submitData);
    }
  };

  return (
    <Wrapper>
      <Button isActive={true} onClick={() => setIsTestMode(!isTestMode)} style={{ marginBottom: '10px' }}>
        {isTestMode ? '테스트 모드 ON' : '테스트 모드 OFF'}
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
      
      <PathMap pathCoords={pathData.coordinates} />
      
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
        작성완료
      </Button>

      <PathImagePreview src={pathImage} alt="Path Preview" />
    </Wrapper>
  );
}