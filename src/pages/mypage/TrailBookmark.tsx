import React, { useState, FunctionComponent, SVGProps } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdMoreHoriz } from "react-icons/md";

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

// Link 대신 사용할 수 있는 클릭 가능한 컨테이너
const ClickableContainer = styled.div`
  cursor: pointer;
`;

interface TrailBookmarkProps {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  path: string;
  title: string;
  onClick?: () => void; // 클릭 이벤트 핸들러 추가
  bookmarkId?: number; // 북마크 ID 추가 (수정/삭제용)
}

const TrailBookmark: React.FC<TrailBookmarkProps> = ({
  icon: Icon,
  path,
  title,
  onClick,
  bookmarkId,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleOptionsMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsVisible(!isVisible);
  };

  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지

    if (action === "이름 수정") {
      // 이름 수정 로직
      if (bookmarkId) {
        alert(`북마크 ID: ${bookmarkId} 이름 수정`);
      } else {
        alert("이름 수정");
      }
    } else if (action === "삭제") {
      // 삭제 로직
      if (bookmarkId) {
        alert(`북마크 ID: ${bookmarkId} 삭제`);
      } else {
        alert("삭제");
      }
    }

    setIsVisible(false);
  };

  // onClick 핸들러가 제공되면 그것을 사용하고, 아니면 Link를 사용
  if (onClick) {
    return (
      <List>
        <ClickableContainer onClick={onClick}>
          <ListItem>
            <IconWrapper>
              <Icon />
            </IconWrapper>
            <div>{title}</div>
          </ListItem>
        </ClickableContainer>
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
      </List>
    );
  }

  // 기존 Link 사용 방식 (onClick이 없을 경우)
  return (
    <List>
      <Link to={path}>
        <ListItem>
          <IconWrapper>
            <Icon />
          </IconWrapper>
          <div>{title}</div>
        </ListItem>
      </Link>
      <IconWrapperBtn onClick={toggleOptionsMenu}>
        <MdMoreHoriz size={24} />
        <OptionsMenu isVisible={isVisible}>
          <OptionItem onClick={(e) => handleAction("이름 수정", e)}>
            이름 수정
          </OptionItem>
          <OptionItem onClick={(e) => handleAction("삭제", e)}>삭제</OptionItem>
        </OptionsMenu>
      </IconWrapperBtn>
    </List>
  );
};

export default TrailBookmark;
