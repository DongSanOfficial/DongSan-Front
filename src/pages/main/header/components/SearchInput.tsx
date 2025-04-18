import React, { ChangeEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../../../styles/colors/theme';
import { BsSearch } from 'react-icons/bs';
import { ReactComponent as FootPrint } from "../../../../assets/svg/FootPrint.svg";

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0.75rem;
  padding-left: 45px;
  border-radius: 2rem;
  border: 2px solid ${theme.Green400};
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: ${theme.Gray500};
  }
`;

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${props => props.position}: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: ${props => props.position === 'right' ? 'auto' : 'none'};
  display: flex;
  align-items: center;
  cursor: ${props => props.position === 'right' ? 'pointer' : 'default'};
`;

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  className?: string;
}

const SearchBar = ({
  placeholder = "산책장소를 검색하세요.",
  onChange,
  value,
  onSearch,
  className,
}: SearchBarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <SearchBarContainer ref={containerRef} className={className}>
      <IconWrapper position="left">
        <FootPrint />
      </IconWrapper>
      <SearchInput 
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyPress={handleKeyPress}
      />
      <IconWrapper position="right" onClick={onSearch}>
        <BsSearch size={20} />
      </IconWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;