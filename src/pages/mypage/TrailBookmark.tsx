// src/components/TrailBookmark.tsx

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

interface TrailBookmarkProps {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  path: string;
  title: string;
}

const TrailBookmark: React.FC<TrailBookmarkProps> = ({
  icon: Icon,
  path,
  title,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleOptionsMenu = () => {
    setIsVisible(!isVisible);
  };

  const handleAction = (action: string) => {
    alert(`${action}`);
    setIsVisible(false);
  };

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
          <OptionItem onClick={() => handleAction("이름 수정")}>
            이름 수정
          </OptionItem>
          <OptionItem onClick={() => handleAction("삭제")}>삭제</OptionItem>
        </OptionsMenu>
      </IconWrapperBtn>
    </List>
  );
};

export default TrailBookmark;
