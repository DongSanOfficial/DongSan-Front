import styled from "styled-components";
import { FaStar } from "react-icons/fa";

interface StarProps {
  fill: number;
  size: number;
}

const Star: React.FC<StarProps> = ({ fill, size }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <FaStar size={size} color="#e4e5e9" style={{ position: "absolute" }} />

      <FaStar
        size={size}
        color="#ffc107"
        style={{
          clipPath: `inset(0 ${100 - fill}% 0 0)`, // fill% 만큼 노란색 부분 표시
        }}
      />
    </div>
  );
};

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarRating: React.FC<{ rating: number; size: number }> = ({
  rating,
  size,
}) => {
  const fullStars = Math.floor(rating);
  const decimalPart = (rating - fullStars) * 100;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) return <Star key={index} fill={100} size={size} />;
    if (index === fullStars)
      return <Star key={index} fill={decimalPart} size={size} />;
    return <Star key={index} fill={0} size={size} />;
  });

  return <div style={{ display: "flex", gap: "2px" }}>{stars}</div>;
};

export default function StarCount({
  rating,
  size = 24,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <StarContainer>
      <StarRating rating={rating} size={size} />
    </StarContainer>
  );
}
