import styled from "styled-components";
import { BiBookOpen } from "react-icons/bi";
import { theme } from "src/styles/colors/theme";

const GuideButtonContainer = styled.button`
  border-radius: 2rem;
  border: 2px solid ${theme.Green400};
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

interface GuideButtonProps {
  onClick: () => void;
  className?: string;
}

const GuideButton = ({ onClick, className }: GuideButtonProps) => {
  return (
    <GuideButtonContainer onClick={onClick} className={className}>
      <ButtonContent>
        <BiBookOpen size={20} color={theme.Green500} />
      </ButtonContent>
    </GuideButtonContainer>
  );
};

export default GuideButton;
