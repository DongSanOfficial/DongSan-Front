import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import trail from "src/assets/images/trail.png";
import DateDisplay from "src/components/newway_register/DateDisplay";
import TrailInfo from "src/components/newway_register/TrailInfo";
import ToggleSwitch from "src/components/newway_register/ToggleSwitch";
import InputField from "src/components/newway_register/InputField";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  max-height: 100vh;
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

const Img = styled.img`
  width: 80vw;
  max-width: 322px;
  height: 30vh;
  max-height: 276px;
  margin-bottom: 20px;
`;

const Button = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? theme.Green500 : "#888")};
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

export default function Registration() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

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
      console.log(name, description);
    }
  };

  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Content>
            <DateDisplay />
            <ToggleSwitch />
          </Content>
          <TrailInfo />
        </ContentWrapper>
        <Img src={trail} alt="Trail" />
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
      </Wrapper>
    </>
  );
}
