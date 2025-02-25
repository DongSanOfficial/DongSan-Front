import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { AddToBookmark, SaveToBookmark } from "../../apis/bookmark";
import { AiOutlinePlus } from "react-icons/ai";

const Container = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 20px 130px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eaeaea;
  margin: 16px 0;
`;

const BookmarkForm = styled.form`
  padding: 0;
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  display: block;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #167258;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const CharCount = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #888;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: ${(props) => (props.$primary ? "10px 16px" : "10px 10px")};
  border: none;
  background-color: ${(props) => (props.$primary ? "#167258" : "transparent")};
  color: ${(props) => (props.$primary ? "white" : "#167258")};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  border-radius: ${(props) => (props.$primary ? "20px" : "0")};

  &:disabled {
    background-color: #e0e0e0;
    color: #888;
    cursor: not-allowed;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  max-height: 300px;
  overflow-y: auto;
  min-height: 120px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 4px;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
`;

const RadioInput = styled.input`
  margin-right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #167258;
`;

const BottomButtons = styled.div`
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: white;
  padding: 16px 20px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  z-index: 100;
`;

const CompleteButton = styled(Button)`
  padding: 10px 30px;
  background-color: #167258;
  color: white;
  border-radius: 20px;
  font-weight: bold;
  min-width: 120px;
  justify-content: center;
`;

const AddBookmarkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #167258;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-top: 10px;
`;

const EmptyBookmarks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  color: #aaa;
  font-size: 14px;
`;

interface Bookmark {
  id: number;
  name: string;
}

interface BookmarkContentProps {
  onComplete?: () => void;
}

export const BookmarkContent: React.FC<BookmarkContentProps> = ({
  onComplete,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newBookmarkName, setNewBookmarkName] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: 1, name: "밤에 걷기 좋은 산책로 목록1" },
    { id: 2, name: "밤에 걷기 좋은 산책로 목록2" },
  ]);
  const [selectedBookmark, setSelectedBookmark] = useState<number | null>(null);
  const { walkwayId } = useParams<{ walkwayId: string }>();

  // 북마크 목록이 비어있는지 확인
  const isEmptyBookmarks = bookmarks.length === 0;

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newBookmarkName.trim() && newBookmarkName.length <= 15) {
      try {
        // API 호출로 북마크 생성
        const response = await AddToBookmark({
          name: newBookmarkName.trim(),
        });

        // API 응답에서 받은 bookmarkId로 북마크 생성
        const newBookmark: Bookmark = {
          id: response.bookmarkId,
          name: newBookmarkName.trim(),
        };

        setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);
        setSelectedBookmark(response.bookmarkId); // 새로 생성한 북마크 자동 선택
        setNewBookmarkName("");
        setIsCreating(false);
      } catch (error) {
        console.error("북마크 생성 에러:", error);
        alert("북마크 생성에 실패했습니다.");
      }
    }
  };

  const handleComplete = async () => {
    if (selectedBookmark !== null) {
      try {
        await SaveToBookmark({
          bookmarkId: selectedBookmark,
          walkwayId: Number(walkwayId),
        });
        alert("산책로가 북마크에 저장됨");
        if (onComplete) {
          onComplete();
        }
      } catch (error) {
        console.log("산책로 저장 에러: ", error);
      }
    }
  };

  return (
    <Container>
      <Title>산책로 저장</Title>
      <Divider />

      {!isCreating ? (
        <>
          <RadioGroup>
            {isEmptyBookmarks ? (
              <EmptyBookmarks>저장된 목록이 없습니다.</EmptyBookmarks>
            ) : (
              bookmarks.map((bookmark) => (
                <RadioLabel key={bookmark.id}>
                  <RadioInput
                    type="radio"
                    name="bookmark"
                    checked={selectedBookmark === bookmark.id}
                    onChange={() => setSelectedBookmark(bookmark.id)}
                  />
                  {bookmark.name}
                </RadioLabel>
              ))
            )}
          </RadioGroup>

          <AddBookmarkButton onClick={() => setIsCreating(true)}>
            <AiOutlinePlus /> 새 산책로 목록 등록하기
          </AddBookmarkButton>

          <BottomButtons>
            {selectedBookmark && (
              <CompleteButton $primary onClick={handleComplete}>
                완료
              </CompleteButton>
            )}
          </BottomButtons>
        </>
      ) : (
        <BookmarkForm onSubmit={handleCreateSubmit}>
          <Label>이름</Label>
          <InputWrapper>
            <Input
              type="text"
              value={newBookmarkName}
              onChange={(e) => setNewBookmarkName(e.target.value)}
              maxLength={15}
              placeholder="새 산책로 이름을 작성하세요."
              autoFocus
            />
            <CharCount>{newBookmarkName.length} / 15</CharCount>
          </InputWrapper>
          <ButtonWrapper>
            <Button type="button" onClick={() => setIsCreating(false)}>
              취소
            </Button>
            <Button $primary type="submit">
              + 만들기
            </Button>
          </ButtonWrapper>
        </BookmarkForm>
      )}
    </Container>
  );
};
