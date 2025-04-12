import React from 'react'
import styled from "styled-components";

interface DividerProps {
    margin?: string;
    height?: string;
    backgroundColor?: string;
}

const StyledDivider = styled.div<DividerProps>`
    width: 100%;
    height: ${({ height }) => height || "0.8px"};
    background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.Gray300};
    margin: ${({ margin }) => margin || "1rem 0"};
`;

const Divider = ({ margin, height, backgroundColor }: DividerProps) => {
    return <StyledDivider margin={margin} height={height} backgroundColor={backgroundColor} />;
};

export default Divider;