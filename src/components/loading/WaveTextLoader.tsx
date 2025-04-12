import { keyframes, styled } from "styled-components";
import { theme } from "src/styles/colors/theme";

interface ContainerProps {
  $containerHeight?: string;
}

interface LetterProps {
  $fontSize: string;
  $colorIndex: number;
  $duration: number;
  $delay: number;
}

interface WaveTextLoaderProps {
  children: React.ReactNode;
  fontSize?: string;
  containerHeight?: string;
  animationDuration?: number;
}

const waveAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(4px);
  }
`;

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${(props) => props.$containerHeight || "100vh"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.White};
`;

const TextContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const Letter = styled.span<LetterProps>`
  display: inline-block;
  font-size: ${(props) => props.$fontSize};
  color: ${(props) => {
    const colors = [
      theme.Green900,
      theme.Green600,
      theme.Green500,
      theme.Green300,
    ];
    return colors[props.$colorIndex % colors.length];
  }};
  animation: ${waveAnimation} ${(props) => props.$duration}s ease infinite;
  animation-delay: ${(props) => props.$delay}s;
`;

const WaveTextLoader = ({
  children,
  fontSize = "18px",
  containerHeight,
  animationDuration = 2,
}: WaveTextLoaderProps) => {
  const text = String(children);

  return (
    <Container $containerHeight={containerHeight}>
      <TextContainer>
        {text.split("").map((char, index) => (
          <Letter
            key={index}
            $fontSize={fontSize}
            $colorIndex={index}
            $delay={index * 0.1}
            $duration={animationDuration}
          >
            {char}
          </Letter>
        ))}
      </TextContainer>
    </Container>
  );
};

export default WaveTextLoader;
