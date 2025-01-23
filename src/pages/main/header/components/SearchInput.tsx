import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { theme } from '../../../../styles/colors/theme';
import { BsSearch } from 'react-icons/bs';
import { ReactComponent as FootPrint } from "../../../../assets/svg/FootPrint.svg";

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0.75rem;
  padding-left: 45px;
  border-radius: 2rem;
  border: 0.5px solid;
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${theme.Gray500};
  }
`;

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${props => props.position}: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
`;

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar = ({
  placeholder = "산책장소를 검색하세요.",
  onChange,
  value,
  className
}: SearchBarProps) => {
  return (
    <SearchBarContainer className={className}>
      <IconWrapper position="left">
        <FootPrint />
      </IconWrapper>
      <SearchInput 
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <IconWrapper position="right">
        <BsSearch size={20} />
      </IconWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;