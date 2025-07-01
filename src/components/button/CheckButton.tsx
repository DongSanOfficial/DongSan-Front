import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const Button = styled.button<{ active: boolean }>`
  height: 38px;
  width: 100%;
  font-size: 12px;
  background-color: ${({ active }) =>
    active ? theme.Green500 : theme.Gray400};
  color: #fff;
  border: none;
  border-radius: 6px;
  margin-top: 0.5rem;
  cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
  white-space: nowrap;
  transition: background-color 0.2s ease;
`;

interface CheckButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

export default function CheckButton({
  active,
  label,
  onClick,
}: CheckButtonProps) {
  return (
    <Button active={active} onClick={active ? onClick : undefined}>
      {label}
    </Button>
  );
}
