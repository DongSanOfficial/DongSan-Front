import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown, MdMap, MdGpsFixed } from "react-icons/md";

interface Option {
  value: string;
  label: string;
}

interface CommonDropdownProps {
  options: Option[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
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
  min-width: 100px;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent; // 모바일에서 탭 시 하이라이트 제거
  touch-action: manipulation; // 더블탭 줌 방지
`;

const OptionsList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.Gray200};
  border-radius: 0.5rem;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
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
    background-color: ${({ theme }) => theme.Gray100};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) => theme.Gray100};
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
  fontsize: 0.5rem;
`;

const getIconForValue = (value: string) => {
  switch (value) {
    case "map":
      return <MdMap size={16} />;
    case "gps":
      return <MdGpsFixed size={16} />;
    default:
      return <MdMap size={16} />;
  }
};

const DropDownButton = ({
  options,
  value,
  onChange,
  onFocus,
  onBlur,
  className,
}: CommonDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentOption =
    options.find((option) => option.value === value) || options[0];
  const currentIcon = getIconForValue(value || options[0].value);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleMouseDown, {
        passive: true,
      });
      document.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, [isOpen]);

  const handleOptionClick = (selectedValue: string) => {
    const syntheticEvent = {
      target: { value: selectedValue },
    } as ChangeEvent<HTMLSelectElement>;

    onChange(syntheticEvent);
    setIsOpen(false);
  };

  const toggleDropdown = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer
      ref={dropdownRef}
      className={className}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <SelectWrapper onClick={toggleDropdown} onTouchEnd={toggleDropdown}>
        <CustomSelect>
          <SelectedContent>
            {currentIcon}
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
            onClick={() => handleOptionClick(option.value)}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleOptionClick(option.value);
            }}
            role="option"
            aria-selected={option.value === value}
          >
            {getIconForValue(option.value)}
            {option.label}
          </OptionItem>
        ))}
      </OptionsList>
    </DropdownContainer>
  );
};

export default DropDownButton;
