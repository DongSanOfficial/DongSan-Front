import React, { ChangeEvent, useRef } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/colors/theme";
import { BsSearch } from "react-icons/bs";
import { ReactComponent as FootPrint } from "src/assets/svg/FootPrint.svg";

interface CustomInputProps {
  hasLeftIcon: boolean;
  inputStyle: {
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
  };
}

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input<CustomInputProps>`
  width: 100%;
  height: 50px;
  padding: 0.75rem;
  padding-left: ${(props) => (props.hasLeftIcon ? "45px" : "1rem")};
  border: ${(props) => props.inputStyle.border};
  border-radius: ${(props) => props.inputStyle.borderRadius};
  box-shadow: ${(props) => props.inputStyle.boxShadow};
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${theme.Gray500};
  }

  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div<{ position: "left" | "right" }>`
  position: absolute;
  ${(props) => props.position}: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: ${(props) => (props.position === "right" ? "auto" : "none")};
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.position === "right" ? "pointer" : "default")};
`;

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  className?: string;
  leftIcon: boolean;
  inputStyle: {
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
  };
}

const SearchBar = ({
  placeholder = "산책장소를 검색하세요.",
  onChange,
  value,
  onSearch,
  className,
  leftIcon = true,
  inputStyle,
}: SearchBarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <SearchBarContainer ref={containerRef} className={className}>
      {leftIcon && (
        <IconWrapper position="left">
          <FootPrint />
        </IconWrapper>
      )}
      <SearchInput
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyPress={handleKeyPress}
        hasLeftIcon={leftIcon}
        inputStyle={inputStyle}
      />
      <IconWrapper position="right" onClick={onSearch}>
        <BsSearch size={20} />
      </IconWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;
