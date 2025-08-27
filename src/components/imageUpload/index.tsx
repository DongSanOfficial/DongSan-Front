import styled from "styled-components";
import { useRef, useState } from "react";
import {
  compressImage,
  convertHeicToJpeg,
  isHeicFile,
} from "src/utils/imageUtils";

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
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.Gray600};
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.Red500};
  margin-top: 8px;
  text-align: left;
`;

interface Props {
  file: File | null;
  onChange: (file: File) => void;
  previewUrl?: string;
}

export default function ImageUploader({ file, onChange, previewUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const handleClick = () => {
    if (!isProcessing) {
      inputRef.current?.click();
    }
  };

  const processImage = async (originalFile: File): Promise<File> => {
    let processedFile = originalFile;

    // HEIC 파일인 경우 JPEG로 변환
    if (isHeicFile(originalFile)) {
      console.log("HEIC 파일 감지, JPEG로 변환 중...");
      processedFile = await convertHeicToJpeg(originalFile);
    }

    // 이미지 압축 (최대 800px)
    console.log("이미지 압축 중...");
    const compressedFile = await compressImage(processedFile, 800);

    return compressedFile;
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setIsProcessing(true);
    setError("");

    try {
      // 파일 크기 체크 (10MB 제한)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selected.size > maxSize) {
        throw new Error("파일 크기는 10MB 이하여야 합니다.");
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/heic",
        "image/heif",
      ];

      const isValidType =
        allowedTypes.includes(selected.type) ||
        /\.(jpg|jpeg|png|gif|webp|heic|heif)$/i.test(selected.name);

      if (!isValidType) {
        throw new Error(
          "지원하지 않는 파일 형식입니다. (JPG, PNG, GIF, WebP, HEIC 파일만 지원)"
        );
      }

      const processedFile = await processImage(selected);
      onChange(processedFile);
    } catch (error) {
      console.error("이미지 처리 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "이미지 처리 중 오류가 발생했습니다."
      );
    } finally {
      setIsProcessing(false);
      // 파일 입력 초기화 (같은 파일 재선택 가능하도록)
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const getPreviewSrc = () => {
    if (file) {
      return URL.createObjectURL(file);
    }
    if (previewUrl) {
      return previewUrl;
    }
    return null;
  };

  const previewSrc = getPreviewSrc();

  return (
    <>
      <UploadBox onClick={handleClick}>
        {previewSrc ? (
          <PreviewImage src={previewSrc} alt="preview" />
        ) : (
          "탭하여 이미지 등록"
        )}
        {isProcessing && <LoadingOverlay>이미지 처리 중...</LoadingOverlay>}
      </UploadBox>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <HiddenInput
        type="file"
        accept="image/*,.heic,.heif"
        ref={inputRef}
        onChange={handleChange}
        disabled={isProcessing}
      />
    </>
  );
}