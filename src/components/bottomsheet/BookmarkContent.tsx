import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  AddToBookmark,
  getBookmark,
  SaveToBookmark,
} from "../../apis/bookmark";
import { AiOutlinePlus } from "react-icons/ai";
import { useToast } from "src/hooks/useToast";

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
  height: calc(100% - 120px);
  display: flex;
  flex-direction: column;
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

const CheckboxGroupContainer = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  max-height: 240px;
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
  position: relative;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + span {
    background-color: #167258;
    border-color: #167258;
  }

  &:checked + span:after {
    display: block;
  }
`;

const CustomCheckbox = styled.span`
  position: relative;
  height: 20px;
  width: 20px;
  margin-right: 12px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 50%;

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 6px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
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

const FormBottom = styled.div`
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background-color: white;
  padding: 16px 20px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
`;

const SelectedCount = styled.span`
  font-size: 14px;
  color: #167258;
  margin-left: 8px;
`;

interface Bookmark {
  id: number;
  name: string;
  marked?: boolean;
}

interface BookmarkContentProps {
  onComplete?: () => void;
}

export const BookmarkContent: React.FC<BookmarkContentProps> = ({
  onComplete,
}) => {
  const { showToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [newBookmarkName, setNewBookmarkName] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);
  const { walkwayId } = useParams<{ walkwayId: string }>();

  const isEmptyBookmarks = bookmarks.length === 0;

  const toggleBookmarkSelection = (bookmarkId: number) => {
    setSelectedBookmarks((prev) => {
      if (prev.includes(bookmarkId)) {
        return prev.filter((id) => id !== bookmarkId);
      } else {
        return [...prev, bookmarkId];
      }
    });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newBookmarkName.trim() && newBookmarkName.length <= 15) {
      try {
        const response = await AddToBookmark({
          name: newBookmarkName.trim(),
        });

        const newBookmark: Bookmark = {
          id: response.bookmarkId,
          name: newBookmarkName.trim(),
        };

        setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);
        setSelectedBookmarks((prev) => [...prev, response.bookmarkId]);
        setNewBookmarkName("");
        setIsCreating(false);
      } catch (error) {
        console.error("북마크 생성 에러:", error);
        alert("북마크 생성에 실패했습니다.");
      }
    }
  };

  const handleComplete = async () => {
    if (selectedBookmarks.length > 0) {
      try {
        const savePromises = selectedBookmarks.map((bookmarkId) =>
          SaveToBookmark({
            bookmarkId: bookmarkId,
            walkwayId: Number(walkwayId),
          })
        );

        await Promise.all(savePromises);
        showToast("산책로가 저장되었습니다.", "success");
        if (onComplete) {
          onComplete();
        }
      } catch (error) {
        showToast("잠시 후 다시 시도해주세요.", "error");
      }
    }
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!walkwayId) return;

      console.log("북마크 조회 시작 - walkwayId:", walkwayId);

      try {
        const response = await getBookmark({
          walkwayId: Number(walkwayId),
          size: 10,
        });

        console.log("북마크 조회 결과:", response);

        const formattedBookmarks = response.data.map((bookmark) => ({
          id: bookmark.bookmarkId,
          name: bookmark.name,
          marked: bookmark.marked,
        }));

        setBookmarks(formattedBookmarks);

        const markedBookmarkIds = response.data
          .filter((data) => data.marked)
          .map((data) => data.bookmarkId);

        if (markedBookmarkIds.length > 0) {
          setSelectedBookmarks(markedBookmarkIds);
        }
      } catch (error) {
        console.error("북마크 조회 에러:", error);
      }
    };

    fetchBookmarks();
  }, [walkwayId]);

  return (
    <Container>
      <Title>산책로 저장</Title>
      <Divider />

      {!isCreating ? (
        <>
          <CheckboxGroupContainer>
            <CheckboxGroup>
              {isEmptyBookmarks ? (
                <EmptyBookmarks>저장된 목록이 없습니다.</EmptyBookmarks>
              ) : (
                bookmarks.map((bookmark) => (
                  <CheckboxLabel key={bookmark.id}>
                    <CheckboxInput
                      type="checkbox"
                      name="bookmark"
                      checked={selectedBookmarks.includes(bookmark.id)}
                      onChange={() => toggleBookmarkSelection(bookmark.id)}
                    />
                    <CustomCheckbox />
                    {bookmark.name}
                  </CheckboxLabel>
                ))
              )}
            </CheckboxGroup>
          </CheckboxGroupContainer>

          <AddBookmarkButton onClick={() => setIsCreating(true)}>
            <AiOutlinePlus /> 새 산책로 목록 등록하기
            {selectedBookmarks.length > 0 && (
              <SelectedCount>
                ({selectedBookmarks.length}개 선택됨)
              </SelectedCount>
            )}
          </AddBookmarkButton>

          <BottomButtons>
            {selectedBookmarks.length > 0 && (
              <CompleteButton $primary onClick={handleComplete}>
                {selectedBookmarks.length > 1
                  ? `${selectedBookmarks.length}개 저장`
                  : "저장하기"}
              </CompleteButton>
            )}
          </BottomButtons>
        </>
      ) : (
        <>
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
          </BookmarkForm>

          <FormBottom>
            <Button type="button" onClick={() => setIsCreating(false)}>
              취소
            </Button>
            <Button $primary onClick={handleCreateSubmit}>
              + 만들기
            </Button>
          </FormBottom>
        </>
      )}
    </Container>
  );
};
