import styled from 'styled-components';
import { useState } from 'react';
import { theme } from '../../styles/colors/theme';

interface SmallButtonProps {
    primaryText: string;
    secondaryText: string;
    onClick?: () => void;
}

const StyledButton = styled.button<{ isActive: boolean }>`
    padding: 13px 20px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
    border:none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: ${({ isActive }) => isActive ? theme.Green500 : 'white'};
    color: ${({ isActive }) => isActive ? 'white' : theme.Green500};
`;

export default function SmallButton({ primaryText, secondaryText, onClick }: SmallButtonProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        onClick?.();
    };

    return (
        <StyledButton isActive={isActive} onClick={handleClick}>
        {isActive ? secondaryText : primaryText}
        </StyledButton>
    );
}