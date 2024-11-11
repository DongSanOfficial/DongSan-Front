import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { BsFillBackspaceFill } from "react-icons/bs";
import { MdMap } from "react-icons/md";
import SearchBar from "./components/SearchInput";
import CommonDropdown from "../../../components/CommonDropdown";
import SortDropdown from "./components/SortDropdown";

interface Option {
  value: string;
  label: string;
}

const Container = styled.div`
  width: 100%;
`;

const TopActionBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const IconButton = styled.button`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const SortOptionsWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 200px;
`;

const OptionsContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.Gray300};
  border-radius: 4px;
  margin-top: 4px;
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const Divider = styled.div`
  width: 100%;
  height: 0.8px;
  background-color: ${({ theme }) => theme.Gray300};
  margin: 1rem 0;
`;

const StyledMapIcon = styled(MdMap)`
  color: ${({ theme }) => theme.Green500};
`;

const StyledBackspaceIcon = styled(BsFillBackspaceFill)`
  color: ${({ theme }) => theme.Black};
`;

const BottomSheetHeader = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [orderType, setOrderType] = useState<string>("recommended");

  const categoryOptions: Option[] = [
    { value: "map", label: "지도 중심" },
    { value: "gps", label: "내위치 중심" },
  ];
  const [categoryValue, setCategoryValue] = useState<string>(
    categoryOptions[0].value
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(e.target.value);
  };

  const handleOrderTypeChange = (value: string) => {
    setOrderType(value);
  };

  return (
    <Container>
      <TopActionBarContainer>
        <IconButton type="button" aria-label="지도 마커">
          <StyledMapIcon size={32} />
        </IconButton>
        <SearchBar value={searchValue} onChange={handleSearchChange} />
        <IconButton type="button" aria-label="닫기">
          <StyledBackspaceIcon size={28} />
        </IconButton>
      </TopActionBarContainer>

      <SortOptionsWrapper>
        <DropdownContainer>
          <CommonDropdown
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
        <SortDropdown value={orderType} onChange={handleOrderTypeChange} />
      </SortOptionsWrapper>
      <Divider />
    </Container>
  );
};

export default BottomSheetHeader;
