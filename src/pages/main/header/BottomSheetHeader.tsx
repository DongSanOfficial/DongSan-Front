import React from "react";
import styled from "styled-components";
import Divider from "../../../components/Divider";
import { ReactComponent as DongSanTextLogo } from "../../../assets/svg/DongSanTextLogo.svg";
import DropDownButton from "../../../components/button/DropDownButton";
import { SortOption } from "../../../apis/walkway.type";

const Container = styled.div`
  width: 100%;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DropdownWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

interface BottomSheetHeaderProps {
  /** 현재 선택된 정렬 옵션 */
  sortValue: SortOption;
  /** 정렬 옵션 변경 핸들러 */
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { value: "liked", label: "인기순" },
  { value: "rating", label: "별점순" },
] as const;

const BottomSheetHeader = ({
  sortValue,
  onSortChange,
}: BottomSheetHeaderProps) => {
  return (
    <Container>
      <DropdownContainer>
        <DongSanTextLogo />
        <DropdownWrapper>
          <DropDownButton
            options={sortOptions}
            value={sortValue}
            onChange={onSortChange}
          />
        </DropdownWrapper>
      </DropdownContainer>
      <Divider />
    </Container>
  );
};

export default BottomSheetHeader;
