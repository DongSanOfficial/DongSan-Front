import React from "react";
import styled from "styled-components";
import thumnail from "src/assets/images/TrailThumbnail.png";
import favoriteIcon from "src/assets/images/Favorite.png";
import bookmarkIcon from "src/assets/images/bookmark.png";
import { MdMoreHoriz } from "react-icons/md";
import TrailCard from "src/components/TrailCard_mp";
import ReviewCard from "src/components/ReviewCard_mp";
import { Link } from "react-router-dom";

interface Trail {
  id: number;
  name: string;
  date: string;
  length: number;
  image: string;
}
interface Review {
  id: number;
  trailName: string;
  date: string;
  content: string;
  rating: number;
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #054630;
  margin: 5px;
`;
const Img = styled.div`
  width: 95px;
  height: 95px;
  border-radius: 50px;
  border: black 0.5px solid;
  margin: 15px;
`;
const Line = styled.div`
  align-items: center;
  width: 95%;
  height: 1px;
  background-color: #cdcdcd;
  margin: 12px;
`;
const Items = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 10px 5px 10px 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SeeAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin: 10px 25px;
`;
const Button = styled.span`
  font-size: 10px;
  margin: 10px 25px;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 25px;
  font-size: 15px;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function MyPage() {
  const trails: Trail[] = [
    {
      id: 1,
      name: "휴양림 산책",
      date: "2024.09.25",
      length: 4.8,
      image: thumnail,
    },
    {
      id: 2,
      name: "다른 산책로",
      date: "2024.10.01",
      length: 3.2,
      image: thumnail,
    },
  ];
  const reviews: Review[] = [
    {
      id: 1,
      trailName: "산책로1",
      date: "2024.09.25",
      content: "산책로가 이뻐요 8시쯤 가세요 근데 벌레 개많음 ㅜ",
      rating: 3,
    },
    {
      id: 2,
      trailName: "산책로1",
      date: "2024.09.25",
      content: "산책로가 이뻐요 8시쯤 가세요 근데 벌레 개많음 ㅜ",
      rating: 3,
    },
  ];
  return (
    <Wrapper>
      <Profile>
        <Img></Img>
        <div>
          <Name>이름</Name>
          <div>123456789@gmail.com</div>
        </div>
      </Profile>
      <Line></Line>
      <div>
        <SeeAll>
          <Title>내가 등록한 산책로 보기</Title>
          <Link to="/mypage/TrailList">
            <Button>전체보기</Button>
          </Link>
        </SeeAll>
        <Items>
          {trails.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </Items>
      </div>

      <Line></Line>
      <div>
        <Title>내가 "찜"한 산책로 조회</Title>
        <List>
          <ListItem>
            <img src={favoriteIcon} />
            <div>내가 좋아하는 산책로</div>
          </ListItem>
          <MdMoreHoriz />
        </List>
        <List>
          <ListItem>
            <img src={bookmarkIcon} style={{ width: "15px", margin: "5px" }} />
            <div>{`북마크 이름`}</div>
          </ListItem>
          <MdMoreHoriz />
        </List>
      </div>

      <Line></Line>
      <div>
        <SeeAll>
          <Title>내가 작성한 리뷰 모아보기</Title>
          <Button>전체보기</Button>
        </SeeAll>
        <Items>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              trailName={review.trailName}
              date={review.date}
              content={review.content}
              rating={review.rating}
            />
          ))}
        </Items>
      </div>
    </Wrapper>
  );
}

export default MyPage;
