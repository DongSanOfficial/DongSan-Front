import React from "react";
import styled from "styled-components";
import { ReactComponent as DongSanTextLogo } from "../../../assets/svg/DongSanTextLogo.svg";
import DropDownButton from "../../../components/button/DropDownButton";
import { MapOption, SortOption } from "../../../apis/walkway.type";

const Container = styled.div`
  width: 100%;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

interface BottomSheetHeaderProps {
  /** 현재 선택된 정렬 옵션 */
  sortValue: SortOption;
  mapValue: MapOption;
  /** 정렬 옵션 변경 핸들러 */
  onSortChange: (value: string) => void;
  onMapChange: (value: string) => void;
}

const sortOptions = [
  { value: "liked", label: "인기순" },
  { value: "rating", label: "별점순" },
] as const;

const mapOptions = [
  { value: "current", label: "현재위치" },
  { value: "all", label: "모든산책로" },
] as const;

const BottomSheetHeader = ({
  sortValue,
  mapValue,
  onSortChange,
  onMapChange
}: BottomSheetHeaderProps) => {
  return (
    <Container>
      <DropdownContainer>
        <DongSanTextLogo />
        <DropdownWrapper>
          <DropDownButton
            options={mapOptions}
            value={mapValue}
            onChange={onMapChange}
          />
        </DropdownWrapper>
        <DropdownWrapper>
          <DropDownButton
            options={sortOptions}
            value={sortValue}
            onChange={onSortChange}
          />
        </DropdownWrapper>
      </DropdownContainer>
    </Container>
  );
};

export default BottomSheetHeader;
