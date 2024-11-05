import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface Option {
  value: string;
  label: string;
}

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Container = styled.div`
  position: relative;
  width: 80px;
`;

const SelectedButton = styled.button`
  width: 100%;
  padding: 0.75rem 0;
  border-radius: 100px;
  border: none;
  background-color: ${({ theme }) => theme.Black};
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }
`;

const DropdownList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 0.5rem;
  font-size: 0.75rem;
`;

const OptionButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 100px;
  border: none;
  background-color: ${({ isSelected }) =>
    isSelected ? "#f8f9fa" : "transparent"};
  color: ${({ theme }) => theme.Black};
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.white};
  }
`;

const SortDropdown = ({
  value,
  onChange,
  className,
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options: Option[] = [
    { value: "recommended", label: "추천순" },
    { value: "distance", label: "거리순" },
    { value: "star", label: "별점순" },
    { value: "keep", label: "저장순" },
  ];

  const currentOption =
    options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <Container ref={containerRef} className={className}>
      <SelectedButton onClick={() => setIsOpen(!isOpen)}>
        {currentOption.label}
      </SelectedButton>
      <DropdownList isOpen={isOpen}>
        {options.map((option) => (
          <OptionButton
            key={option.value}
            isSelected={value === option.value}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </OptionButton>
        ))}
      </DropdownList>
    </Container>
  );
};

export default SortDropdown;
