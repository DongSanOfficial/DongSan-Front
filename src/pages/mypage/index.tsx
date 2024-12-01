import React, { useState } from "react";
import styled from "styled-components";
import thumnail from "src/assets/images/TrailThumbnail.png";
import { ReactComponent as Favorite } from "../../assets/svg/Favorite.svg";
import { ReactComponent as BookMark } from "../../assets/svg/BookMark.svg";
import { MdMoreHoriz } from "react-icons/md";
import TrailCard from "src/components/TrailCard_mp";
import ReviewCard from "src/components/ReviewCard_mp";
import { Link } from "react-router-dom";
import profileImg from "../../assets/svg/profile.svg";

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
  min-height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
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

const Img = styled.img`
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

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

const IconWrapperBtn = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  position: relative;
`;

const OptionsMenu = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  z-index: 100;
`;

const OptionItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

function MyPage() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const toggleOptionsMenu = () => {
    setIsOptionsVisible((prev) => !prev);
  };

  const handleEditName = () => {
    alert("이름 수정");
    setIsOptionsVisible(false);
  };

  const handleDelete = () => {
    alert("삭제");
    setIsOptionsVisible(false);
  };
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
        <Img src={profileImg} alt="프로필 이미지" />
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
          <Link to="/mypage/TrailLikeList?type=favorites">
            <ListItem>
              <IconWrapper>
                <Favorite />
              </IconWrapper>
              <div>내가 좋아하는 산책로</div>
            </ListItem>
          </Link>
          <IconWrapperBtn onClick={toggleOptionsMenu}>
            <MdMoreHoriz size={24} />
            <OptionsMenu isVisible={isOptionsVisible}>
              <OptionItem onClick={handleEditName}>이름 수정</OptionItem>
              <OptionItem onClick={handleDelete}>삭제</OptionItem>
            </OptionsMenu>
          </IconWrapperBtn>
        </List>
        <List>
          <Link to="/mypage/TrailLikeList?type=bookmarks">
            <ListItem>
              <IconWrapper>
                <BookMark />
              </IconWrapper>
              <div>{`북마크 이름`}</div>
            </ListItem>
          </Link>
          <IconWrapperBtn onClick={toggleOptionsMenu}>
            <MdMoreHoriz size={24} />
            <OptionsMenu isVisible={isOptionsVisible}>
              <OptionItem onClick={handleEditName}>이름 수정</OptionItem>
              <OptionItem onClick={handleDelete}>삭제</OptionItem>
            </OptionsMenu>
          </IconWrapperBtn>
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
