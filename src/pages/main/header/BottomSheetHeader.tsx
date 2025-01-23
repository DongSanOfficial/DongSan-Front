import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import Divider from "../../../components/Divider";
import { theme } from "../../../styles/colors/theme";
import DropdownButton from "../../../components/button/DropDownButton";
import { ReactComponent as DongSanTextLogo } from "../../../assets/svg/DongSanTextLogo.svg";

interface Option {
  value: string;
  label: string;
}

const Container = styled.div`
  width: 100%;
`;

const SortOptionsWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

const OptionsContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid ${theme.Gray300};
  border-radius: 4px;
  margin-top: 4px;
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const BottomSheetHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categoryOptions: Option[] = [
    { value: "map", label: "지도 중심" },
    { value: "gps", label: "내위치 중심" },
  ];
  const [categoryValue, setCategoryValue] = useState<string>(
    categoryOptions[0].value
  );

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(e.target.value);
  };

  return (
    <Container>
      <SortOptionsWrapper>
        <DropdownContainer>
          <DongSanTextLogo />
          <DropdownButton
            options={categoryOptions}
            value={categoryValue}
            onChange={handleCategoryChange}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setIsDropdownOpen(false)}
          />
          <OptionsContainer isOpen={isDropdownOpen}>
            {categoryOptions.map((option) => (
              <div key={option.value}>{option.label}</div>
            ))}
          </OptionsContainer>
        </DropdownContainer>
      </SortOptionsWrapper>
      <Divider />
    </Container>
  );
};

export default BottomSheetHeader;
