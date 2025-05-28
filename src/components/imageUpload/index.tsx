import styled from "styled-components";
import { useRef } from "react";

const UploadBox = styled.div`
  width: 150px;
  height: 150px;
  border: 2px dashed ${({ theme }) => theme.Gray300};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme }) => theme.Gray400};
  cursor: pointer;
  overflow: hidden;
  background-color: ${({ theme }) => theme.Gray100};
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function ImageUploader({ file, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      onChange(selected);
    }
  };

  return (
    <>
      <UploadBox onClick={handleClick}>
        {file ? (
          <PreviewImage src={URL.createObjectURL(file)} alt="preview" />
        ) : (
          "탭하여 이미지 등록"
        )}
      </UploadBox>
      <HiddenInput
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
      />
    </>
  );
}
