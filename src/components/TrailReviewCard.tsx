import { FaStar } from "react-icons/fa";
import styled from "styled-components";

interface ReviewCardProps {
  trailName: string;
  date: string;
  content: string;
  rating: number;
  period?: string;
  walkwayId?: number;
  onClick?: () => void;
}
const ReviewItems = styled.div`
  flex: 0 0 auto;
  width: 350px;
  height: auto;
  background: #ffffff;
  // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-left: 7px;
  padding-bottom: 1rem;
  color: #054630;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    max-width: 100%;
  }
`;
const ReviewTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 15px 5px 15px;
`;
const TrailName = styled.div`
  font-size: 15px;
  font-weight: 600;
`;
const ReviewStars = styled.div`
  display: flex;
  align-items: center;
  margin: 0 18px;
  color: #fbbc05;
`;
const PeriodContent = styled.div`
  color: #737373;
  font-size: 12px;
  font-weight: 500;
  margin-left: 1rem;
`;
const ReviewContents = styled.div`
  font-size: 12px;
  font-weight: 600;
  padding: 5px 15px;
`;
const TrailReviewCard: React.FC<ReviewCardProps> = ({
  trailName,
  content,
  rating,
  period,
  onClick,
}) => {
  return (
    <ReviewItems onClick={onClick}>
      <ReviewTitle>
        <TrailName>| {trailName}</TrailName>
      </ReviewTitle>
      <ReviewStars>
        {Array.from({ length: rating }).map((_, index) => (
          <FaStar key={index} />
        ))}
        <PeriodContent>{period}</PeriodContent>
      </ReviewStars>

      <ReviewContents>{content}</ReviewContents>
    </ReviewItems>
  );
};
export default TrailReviewCard;
