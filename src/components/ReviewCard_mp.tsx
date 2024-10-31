import { FaStar } from "react-icons/fa";
import styled from "styled-components";

interface ReviewCardProps {
  trailName: string;
  date: string;
  content: string;
  rating: number;
}
const ReviewItems = styled.div`
  flex: 0 0 auto;
  width: 282px;
  height: 142px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-left: 7px;
  color: #054630;
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
const ReviewContents = styled.div`
  font-size: 12px;
  font-weight: 600;
  padding: 5px 15px;
`;
const ReviewCard: React.FC<ReviewCardProps> = ({
  trailName,
  date,
  content,
  rating,
}) => (
  <ReviewItems>
    <ReviewTitle>
      <TrailName>| {trailName}</TrailName>
      <div
        style={{
          fontSize: "12px",
          fontFamily: "Pretendard",
          fontWeight: "600",
        }}
      >
        {date}
      </div>
    </ReviewTitle>
    <ReviewStars>
      {Array.from({ length: rating }).map((_, index) => (
        <FaStar key={index} />
      ))}
    </ReviewStars>
    <ReviewContents>{content}</ReviewContents>
  </ReviewItems>
);
export default ReviewCard;
