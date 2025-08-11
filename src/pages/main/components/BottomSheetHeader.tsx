import styled from "styled-components";
import { ReactComponent as DongSanTextLogo } from "../../../assets/svg/DongSanTextLogo.svg";
import DropDownButton from "../../../components/button/DropDownButton";
import { MapOption, SortOption } from "../../../apis/walkway/walkway.type";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
  gap: 5px;
`;

interface BottomSheetHeaderProps {
  sortValue: SortOption;
  mapValue: MapOption;
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
  onMapChange,
}: BottomSheetHeaderProps) => {
  return (
    <Container>
      <Wrapper>
        <DongSanTextLogo />
        <DropdownContainer>
          <DropDownButton
            options={mapOptions}
            value={mapValue}
            onChange={onMapChange}
          />

          <DropDownButton
            options={sortOptions}
            value={sortValue}
            onChange={onSortChange}
          />
        </DropdownContainer>
      </Wrapper>
    </Container>
  );
};

export default BottomSheetHeader;
