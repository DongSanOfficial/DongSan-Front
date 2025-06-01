import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import { theme } from "src/styles/colors/theme";

export interface Option<T extends string> {
  value: T;
  label: string;
}

interface DropDownButtonProps<T extends string> {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "small" | "medium";
}

const sizeStyles = {
  small: css`
    font-size: 12px;
    border-radius: 6px;
  `,
  medium: css`
    font-size: 14px;
    border-radius: 8px;
  `,
};

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CustomSelect = styled.div<{ $size: "small" | "medium" }>`
  display: flex;
  ${({ $size }) => sizeStyles[$size]};
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
`;

const OptionsList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid ${theme.Gray200};
  border-radius: 0.5rem;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const OptionItem = styled.div`
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:active {
    background-color: ${theme.Gray100};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${theme.Gray100};
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2px;
`;

const SelectedContent = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

function DropDownButton<T extends string>({
  options,
  value,
  onChange,
  size = "medium",
}: DropDownButtonProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentOption =
    options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <SelectWrapper onClick={() => setIsOpen(!isOpen)}>
        <CustomSelect $size={size}>
          <SelectedContent>{currentOption.label}</SelectedContent>
          <IconWrapper>
            <MdKeyboardArrowDown
              size={20}
              style={{
                transform: `rotate(${isOpen ? 180 : 0}deg)`,
                transition: "transform 0.2s ease",
              }}
            />
          </IconWrapper>
        </CustomSelect>
      </SelectWrapper>

      <OptionsList isOpen={isOpen}>
        {options.map((option) => (
          <OptionItem
            key={option.value}
            onClick={() => {
              onChange(option.value as T);
              setIsOpen(false);
            }}
          >
            {option.label}
          </OptionItem>
        ))}
      </OptionsList>
    </DropdownContainer>
  );
}

export default DropDownButton;
