import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBarContainer = styled.div`
  position: relative;
  flex: 1;
  margin: 0 0.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0.75rem;
  padding-left: 1rem;
  border-radius: 2rem;
  border: 0.5px solid;
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.Gray500};
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const SearchBar= ({
  placeholder = "#해시태그로 검색해보세요",
  onChange,
  value,
  className
}: SearchBarProps) => {
  return (
    <SearchBarContainer className={className}>
      <SearchInput 
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <SearchIconWrapper>
        <BsSearch size={20} />
      </SearchIconWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;