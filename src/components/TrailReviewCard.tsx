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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 100%;
    margin: 0 0 20px 0;
    border-radius: 24px;
  }
`;

const ReviewerName = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding: 15px 15px 5px 15px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 18px;
      margin-bottom: 10px;

  }
`;

const ReviewStars = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
  color: #fbbc05;
  width: calc(100% - 30px); 
  box-sizing: border-box;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 0 20px;
    width: calc(100% - 40px);

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const PeriodContent = styled.div`
  color: #737373;
  font-size: 12px;
  font-weight: 500;
  margin-left: 1rem;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 16px;
    margin-left: 1.5rem;
  }
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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 20px;
    padding: 8px 20px;
    line-height: 1.5;
  }
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
