import styled from "styled-components";

interface CourseImageProps {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  borderRadius?: string;
}

interface StyledImageProps extends CourseImageProps {
  src: string;
  alt: string;
}

const StyledImage = styled.img<CourseImageProps>`
  width: ${(props) => props.width || "30vw"};
  height: ${(props) => props.height || "30vh"};
  max-width: ${(props) => props.maxWidth || "200px"};
  max-height: ${(props) => props.maxHeight || "200px"};
  object-fit: fill;
  border-radius: ${(props) => props.borderRadius || "30px"};
`;

const CourseImage = ({
  src,
  alt = "Path Preview",
  ...props
}: StyledImageProps) => {
  return <StyledImage src={src} alt={alt} {...props} />;
};

export default CourseImage;
