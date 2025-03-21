import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import { ChangeEvent, useEffect, useState } from "react";

const InPutField = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 80vw;
  max-width: 322px;
  height: 3vh;
  padding: 8px 4px;
  margin: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
`;
const CharCounter = styled.span<{ isMax: boolean }>`
  color: ${(props) => (props.isMax ? "red" : theme.Green500)};
  font-size: 12px;
  padding: 10px 0;
`;
interface InputFieldProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}
export default function InputField({
  name,
  setName,
  description,
  setDescription,
}: InputFieldProps) {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setName(e.target.value);
    }
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setDescription(e.target.value);
    }
  };

  return (
    <>
      <InPutField>
        <Input
          value={name}
          placeholder="산책로를 잘 나타내는 이름을 지어주세요."
          maxLength={10}
          onChange={handleNameChange}
          required
        ></Input>
        <CharCounter isMax={name.length === 10}>{name.length}/10</CharCounter>
        <span style={{ color: theme.Red300 }}>*</span>
      </InPutField>

      <InPutField>
        <Input
          value={description}
          placeholder="산책로를 설명해주세요."
          maxLength={30}
          onChange={handleDescriptionChange}
        ></Input>
        <CharCounter isMax={description.length === 30}>
          {description.length}/30
        </CharCounter>
      </InPutField>
    </>
  );
}
