import styled from "styled-components";
import CourseImageBackground from "src/assets/images/CourseImageBackground.png";

interface CourseImageProps {
  size?: string;
  maxSize?: string;
  borderRadius?: string;
}

interface StyledImageProps extends CourseImageProps {
  src: string;
  alt: string;
}

const StyledImage = styled.div<CourseImageProps>`
  width: ${(props) => props.size || "120px"};
  height: ${(props) => props.size || "120px"};
  border-radius: ${(props) => props.borderRadius || "30px"};
  background-image: url(${CourseImageBackground});
  background-size: cover;
  background-position: center;
  aspect-ratio: 1;
`;

const CourseImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const CourseImage = ({
  src,
  alt = "Path Preview",
  ...props
}: StyledImageProps) => {
  return (
    <StyledImage {...props}>
      {src && <CourseImg src={src} alt={alt} />}
    </StyledImage>
  );
};

export default CourseImage;