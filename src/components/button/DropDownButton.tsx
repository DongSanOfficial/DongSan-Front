import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import { theme } from "../../styles/colors/theme";

interface Option {
  value: string;
  label: string;
}

interface DropDownButtonProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CustomSelect = styled.div`
  padding: 0.5rem 2rem 0.5rem 0.3rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  background-color: white;
  min-width: 80px;
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
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;

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
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const SelectedContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DropDownButton = ({ options, value, onChange, className }: DropDownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentOption = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <DropdownContainer ref={dropdownRef} className={className}>
      <SelectWrapper onClick={() => setIsOpen(!isOpen)}>
        <CustomSelect>
          <SelectedContent>
            {currentOption.label}
          </SelectedContent>
        </CustomSelect>
        <IconWrapper>
          <MdKeyboardArrowDown
            size={28}
            style={{
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
              transition: "transform 0.2s ease",
            }}
          />
        </IconWrapper>
      </SelectWrapper>

      <OptionsList isOpen={isOpen}>
        {options.map((option) => (
          <OptionItem
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </OptionItem>
        ))}
      </OptionsList>
    </DropdownContainer>
  );
};

export default DropDownButton;