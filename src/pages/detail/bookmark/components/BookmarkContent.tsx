import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  AddToBookmark,
  getIsBookmarked,
  RemoveToBookmark,
  SaveToBookmark,
} from "../../../../apis/bookmark";
import { AiOutlinePlus } from "react-icons/ai";
import { useToast } from "src/hooks/useToast";
import Divider from "src/components/Divider";
import { theme } from "src/styles/colors/theme";

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 32px;
  padding-top: 10px;
  background: ${theme.White};
  z-index: 1;
  width: 90%;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: ${theme.Gray800};
`;

const ContentScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 60px 0 120px 0;
`;

const BookmarkForm = styled.form`
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  color: ${theme.Gray800};
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
  border-bottom: 1px solid ${theme.Gray200};
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.Green500};
  }

  &::placeholder {
    color: ${theme.Gray400};
  }
`;

const CharCount = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: ${theme.Gray500};
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: ${(props) => (props.$primary ? "10px 16px" : "10px 10px")};
  border: none;
  background-color: ${(props) =>
    props.$primary ? theme.Green500 : "transparent"};
  color: ${(props) => (props.$primary ? theme.White : theme.Green500)};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  border-radius: ${(props) => (props.$primary ? "20px" : "0")};

  &:disabled {
    background-color: ${theme.Gray200};
    color: ${theme.Gray500};
    cursor: not-allowed;
  }
`;

const CheckboxGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
  border-bottom: 1px solid ${theme.Gray100};
  position: relative;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + span {
    background-color: ${theme.Green500};
    border-color: ${theme.Green500};
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
  background-color: ${theme.White};
  border: 1px solid ${theme.Gray300};
  border-radius: 50%;

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 6px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid ${theme.White};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const FixedBottomButtonContainer = styled.div`
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background-color: ${theme.White};
  padding: 16px 20px;
  display: flex;
  justify-content: flex-start;
  z-index: 1;
  border-top: 1px solid ${theme.Gray200};
`;

const AddBookmarkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${theme.Green500};
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
`;

const EmptyBookmarks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  color: ${theme.Gray500};
  font-size: 14px;
`;

const FormBottom = styled.div`
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background-color: ${theme.White};
  padding: 16px 20px;
  border-top: 1px solid ${theme.Gray200};
  display: flex;
  justify-content: space-between;
  z-index: 1;
`;

const SelectedCount = styled.span`
  font-size: 14px;
  color: ${theme.Green500};
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

export const BookmarkContent = ({ onComplete }: BookmarkContentProps) => {
  const { showToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [newBookmarkName, setNewBookmarkName] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);
  const { walkwayId } = useParams<{ walkwayId: string }>();

  const isEmptyBookmarks = bookmarks.length === 0;

  // 이름 중복 체크 함수
  const checkDuplicateName = (name: string): boolean => {
    return bookmarks.some(
      (bookmark) =>
        bookmark.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
  };

  const toggleBookmarkSelection = async (
    bookmarkId: number,
    checked: boolean
  ) => {
    try {
      if (checked) {
        await SaveToBookmark({
          bookmarkId: bookmarkId,
          walkwayId: Number(walkwayId),
        });
        showToast("북마크에 저장되었습니다.", "success");
        setSelectedBookmarks((prev) => [...prev, bookmarkId]);
        setBookmarks((prevBookmarks) =>
          prevBookmarks.map((bookmark) =>
            bookmark.id === bookmarkId
              ? { ...bookmark, marked: true }
              : bookmark
          )
        );
      } else {
        await RemoveToBookmark({ bookmarkId, walkwayId: Number(walkwayId) });
        showToast("북마크에서 제거되었습니다.", "success");
        setSelectedBookmarks((prev) => prev.filter((id) => id !== bookmarkId));
        setBookmarks((prevBookmarks) =>
          prevBookmarks.map((bookmark) =>
            bookmark.id === bookmarkId
              ? { ...bookmark, marked: false }
              : bookmark
          )
        );
      }
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newBookmarkName.trim();

    if (!trimmedName) {
      showToast("북마크 이름을 입력해주세요.", "error");
      return;
    }

    if (trimmedName.length > 15) {
      showToast("북마크 이름은 15자 이내로 입력해주세요.", "error");
      return;
    }

    if (checkDuplicateName(trimmedName)) {
      showToast("해당 이름의 북마크가 이미 존재합니다.", "error");
      return;
    }

    try {
      const response = await AddToBookmark({
        name: trimmedName,
      });

      const newBookmark: Bookmark = {
        id: response.bookmarkId,
        name: trimmedName,
      };

      setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);
      setNewBookmarkName("");
      setIsCreating(false);
      showToast("새 북마크가 생성되었습니다.", "success");
    } catch (error: any) {
      console.error("북마크 생성 에러:", error);

      if (
        error.message &&
        (error.message.includes("이름이 같은 북마크가") ||
          error.message.includes("BOOKMARK-02"))
      ) {
        showToast("해당 이름의 북마크가 이미 존재합니다.", "error");
      } else {
        showToast("잠시후 다시 시도해주세요.", "error");
      }
    }
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!walkwayId) return;
      try {
        const response = await getIsBookmarked({
          walkwayId: Number(walkwayId),
          size: 10,
        });
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
      <FixedHeader>
        <Title>산책로 저장</Title>
        <Divider />
      </FixedHeader>

      <ContentScrollArea>
        {!isCreating ? (
          <>
            <CheckboxGroupContainer>
              <CheckboxGroup>
                {isEmptyBookmarks ? (
                  <EmptyBookmarks>북마크를 생성해주세요.</EmptyBookmarks>
                ) : (
                  bookmarks.map((bookmark) => (
                    <CheckboxLabel key={bookmark.id}>
                      <CheckboxInput
                        type="checkbox"
                        name="bookmark"
                        checked={selectedBookmarks.includes(bookmark.id)}
                        onChange={(e) =>
                          toggleBookmarkSelection(bookmark.id, e.target.checked)
                        }
                      />
                      <CustomCheckbox />
                      {bookmark.name}
                    </CheckboxLabel>
                  ))
                )}
              </CheckboxGroup>
            </CheckboxGroupContainer>
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
          </BookmarkForm>
        )}
      </ContentScrollArea>

      {!isCreating && (
        <FixedBottomButtonContainer>
          <AddBookmarkButton onClick={() => setIsCreating(true)}>
            <AiOutlinePlus /> 새 북마크 등록하기
            {selectedBookmarks.length > 0 && (
              <SelectedCount>
                ({selectedBookmarks.length}개 저장됨)
              </SelectedCount>
            )}
          </AddBookmarkButton>
        </FixedBottomButtonContainer>
      )}

      {isCreating && (
        <FormBottom>
          <Button
            type="button"
            onClick={() => {
              setIsCreating(false);
              setNewBookmarkName("");
            }}
          >
            취소
          </Button>
          <Button
            $primary
            onClick={handleCreateSubmit}
            disabled={!newBookmarkName.trim() || newBookmarkName.length > 15}
          >
            + 만들기
          </Button>
        </FormBottom>
      )}
    </Container>
  );
};