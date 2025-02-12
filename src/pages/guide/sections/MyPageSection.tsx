import React, { forwardRef } from "react";
import {
  BiUser,
  BiMapAlt,
  BiHeart,
  BiBookmark,
  BiComment,
  BiCheckCircle,
} from "react-icons/bi";
import { Section, SectionTitle, List, ListItem } from "../styles/CommonStyles";

const MyPageSection = forwardRef<HTMLDivElement>((props, ref) => (
  <Section ref={ref}>
    <SectionTitle>
      <BiUser size={24} />
      마이페이지 이용 안내
    </SectionTitle>
    <List>
      <ListItem>
        <BiMapAlt />
        내가 등록한 산책로를 모아볼 수 있습니다.
      </ListItem>
      <ListItem>
        <BiHeart />
        내가 좋아요한 산책로를 모아볼 수 있습니다.
      </ListItem>
      <ListItem>
        <BiBookmark />
        내가 북마크에 저장한 내역을 볼 수 있습니다.
      </ListItem>
      <ListItem>
        <BiComment />
        내가 작성한 리뷰를 볼 수 있어요.
      </ListItem>
      <ListItem>
        <BiCheckCircle />
        내가 이용한 산책로 중 리뷰를 작성할 수 있는 산책로를 볼 수 있어요.
        리뷰를 남기 않은 이용내역이 있다면, 리뷰를 남겨보세요!
      </ListItem>
    </List>
  </Section>
));

export default MyPageSection;
