import styled from 'styled-components';
import { theme } from '../../styles/colors/theme';

interface SmallButtonProps {
    primaryText: string;
    secondaryText: string;
    isWalking: boolean; 
    onClick?: () => void;
}

const StyledButton = styled.button<{ isWalking: boolean }>`
    padding: 13px 20px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: ${({ isWalking }) => !isWalking ? theme.White : theme.Green500};
    color: ${({ isWalking }) => !isWalking ? theme.Green500 : theme.White};
`;

export default function SmallButton({ 
    primaryText, 
    secondaryText, 
    isWalking,
    onClick 
}: SmallButtonProps) {
    return (
        <StyledButton 
            isWalking={isWalking} 
            onClick={onClick}
        >
            {isWalking ? secondaryText : primaryText}
        </StyledButton>
    );
}