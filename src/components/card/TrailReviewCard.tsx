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
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 20px;
  margin: 0 0 15px 0;
  color: #054630;
  box-sizing: border-box;
`;

const ReviewerName = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding: 15px 15px 5px 15px;
`;

const ReviewStars = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
  color: #fbbc05;
  width: calc(100% - 30px); 
  box-sizing: border-box;
`;

const PeriodContent = styled.div`
  color: #737373;
  font-size: 12px;
  font-weight: 500;
  margin-left: 1rem;
`;

const ReviewContents = styled.div`
  font-size: 13px;
  font-weight: 600;
  padding: 5px 15px;
  width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  letter-spacing: 1px;
`;

const TrailReviewCard = ({
  trailName,
  content,
  rating,
  period,
  onClick,
}: ReviewCardProps) => {
  return (
    <ReviewItems onClick={onClick}>
        <ReviewerName>| {trailName}</ReviewerName>
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
