import styled from "styled-components";

interface StarProps {
  fill: number;
}

const Star: React.FC<StarProps> = ({ fill }) => {
  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        background: `linear-gradient(to right, #ffc107 ${fill}%, #e4e5e9 ${fill}%)`,
        clipPath: `polygon(
          50% 0%,
          61% 35%,
          98% 35%,
          68% 57%,
          79% 91%,
          50% 70%,
          21% 91%,
          32% 57%,
          2% 35%,
          39% 35%
        )`,
      }}
    />
  );
};
const StarContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #ffc107;
`;
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = (rating - fullStars) * 100;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) return <Star key={index} fill={100} />;
    if (index === fullStars) return <Star key={index} fill={decimalPart} />;
    return <Star key={index} fill={0} />;
  });

  return <div style={{ display: "flex" }}>{stars}</div>;
};

export default function StarCount({ rating }: { rating: number }) {
  return (
    <>
      <StarContainer>
        <StarRating rating={rating} />
      </StarContainer>
    </>
  );
}
