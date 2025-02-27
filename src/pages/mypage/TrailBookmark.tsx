import React, { useState, FunctionComponent, SVGProps } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdMoreHoriz } from "react-icons/md";
import { putBookmarkName, deleteBookmarkName } from "../../apis/bookmark"; // API import

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 25px;
  font-size: 15px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapperBtn = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  position: relative; // 위치 기준점을 IconWrapperBtn으로 설정
`;

const OptionsMenu = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 100%; // 버튼 아래쪽에 나타나도록 조정
  right: 0; // 오른쪽 정렬
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  z-index: 100;
  width: max-content; // 내용에 맞게 너비 조정
`;

const OptionItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ClickableContainer = styled.div`
  cursor: pointer;
`;

// 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button<{ isPrimary?: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${({ isPrimary }) => (isPrimary ? "#167258" : "#e0e0e0")};
  color: ${({ isPrimary }) => (isPrimary ? "white" : "black")};
  cursor: pointer;
`;

const ConfirmModalContent = styled(ModalContent)`
  max-width: 300px;
`;

const ConfirmText = styled.p`
  margin-bottom: 20px;
`;

interface TrailBookmarkProps {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  path: string;
  title: string;
  onClick?: () => void;
  bookmarkId?: number;
  onUpdate?: () => void;
}

const TrailBookmark: React.FC<TrailBookmarkProps> = ({
  icon: Icon,
  path,
  title,
  onClick,
  bookmarkId,
  onUpdate,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newBookmarkName, setNewBookmarkName] = useState(title);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOptionsMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (action === "이름 수정") {
      if (bookmarkId) {
        setNewBookmarkName(title);
        setIsEditModalOpen(true);
      }
    } else if (action === "삭제") {
      if (bookmarkId) {
        setIsDeleteModalOpen(true);
      }
    }

    setIsVisible(false);
  };

  const handleEditBookmark = async () => {
    if (!bookmarkId || !newBookmarkName.trim()) return;

    try {
      setIsLoading(true);
      await putBookmarkName({
        bookmarkId,
        name: newBookmarkName.trim(),
      });

      alert("북마크 이름이 변경되었습니다.");
      setIsEditModalOpen(false);

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("북마크 이름 수정 에러:", error);
      alert("북마크 이름 변경에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 북마크 삭제 처리
  const handleDeleteBookmark = async () => {
    if (!bookmarkId) return;

    try {
      setIsLoading(true);
      await deleteBookmarkName({
        bookmarkId,
      });

      // 삭제 성공 처리
      alert("북마크가 삭제되었습니다.");
      setIsDeleteModalOpen(false);

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("북마크 삭제 에러:", error);
      alert("북마크 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const EditModal = () => (
    <ModalOverlay onClick={() => !isLoading && setIsEditModalOpen(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>북마크 이름 수정</ModalTitle>
        <ModalInput
          type="text"
          value={newBookmarkName}
          onChange={(e) => setNewBookmarkName(e.target.value)}
          maxLength={15}
          placeholder="북마크 이름을 입력하세요"
          autoFocus
        />
        <ModalButtonGroup>
          <ModalButton
            onClick={() => setIsEditModalOpen(false)}
            disabled={isLoading}
          >
            취소
          </ModalButton>
          <ModalButton
            isPrimary
            onClick={handleEditBookmark}
            disabled={isLoading || !newBookmarkName.trim()}
          >
            {isLoading ? "처리 중..." : "저장"}
          </ModalButton>
        </ModalButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );

  // 삭제 확인 모달
  const DeleteConfirmModal = () => (
    <ModalOverlay onClick={() => !isLoading && setIsDeleteModalOpen(false)}>
      <ConfirmModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>북마크 삭제</ModalTitle>
        <ConfirmText>정말 이 북마크를 삭제하시겠습니까?</ConfirmText>
        <ModalButtonGroup>
          <ModalButton
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isLoading}
          >
            취소
          </ModalButton>
          <ModalButton
            isPrimary
            onClick={handleDeleteBookmark}
            disabled={isLoading}
          >
            {isLoading ? "처리 중..." : "삭제"}
          </ModalButton>
        </ModalButtonGroup>
      </ConfirmModalContent>
    </ModalOverlay>
  );

  return (
    <>
      <List>
        {onClick ? (
          <ClickableContainer onClick={onClick}>
            <ListItem>
              <IconWrapper>
                <Icon />
              </IconWrapper>
              <div>{title}</div>
            </ListItem>
          </ClickableContainer>
        ) : (
          <Link to={path}>
            <ListItem>
              <IconWrapper>
                <Icon />
              </IconWrapper>
              <div>{title}</div>
            </ListItem>
          </Link>
        )}

        {/* 좋아하는 산책로는 수정/삭제 옵션 없음 */}
        {title !== "내가 좋아하는 산책로" && (
          <IconWrapperBtn onClick={toggleOptionsMenu}>
            <MdMoreHoriz size={24} />
            <OptionsMenu isVisible={isVisible}>
              <OptionItem onClick={(e) => handleAction("이름 수정", e)}>
                이름 수정
              </OptionItem>
              <OptionItem onClick={(e) => handleAction("삭제", e)}>
                삭제
              </OptionItem>
            </OptionsMenu>
          </IconWrapperBtn>
        )}
      </List>

      {/* 모달 */}
      {isEditModalOpen && <EditModal />}
      {isDeleteModalOpen && <DeleteConfirmModal />}
    </>
  );
};

export default TrailBookmark;
