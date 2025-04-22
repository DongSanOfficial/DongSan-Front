import React, { forwardRef } from "react";
import { BiSearch, BiChevronRight, BiMapAlt } from "react-icons/bi";
import {
  Section,
  SectionTitle,
  SectionContent,
  StepList,
  StepItem,
  StepNumber,
  StepContent,
  List,
  ListItem,
  GuideCard,
  GuideStep,
  NavImg,
} from "../styles/CommonStyles";
import home from "src/assets/images/guide/home.png";
import cardImage from "src/assets/images/guide/cardImage.png";
import card from "src/assets/images/guide/card.png";

const SearchSection = forwardRef<HTMLDivElement>((props, ref) => (
  <Section ref={ref}>
    <SectionTitle>
      <BiSearch size={24} />
      산책로 검색
    </SectionTitle>
    <SectionContent>
      <StepList>
        <StepItem>
          <StepNumber>1</StepNumber>
          <StepContent>
            홈 페이지에서 산책로를 검색할 수 있습니다.
            <NavImg src={home} />
          </StepContent>
        </StepItem>

        <StepItem>
          <StepNumber>2</StepNumber>
          <StepContent>
            다음과 같은 방법으로 산책로를 검색할 수 있습니다.
            <List>
              <ListItem>
                <BiChevronRight />
                기본적으로, 동산에 등록된 모든 산책로가 검색됩니다.
              </ListItem>
              <ListItem>
                <BiChevronRight />
                두 종류의 정렬 버튼을 이용하여, 현재위치 근방에 있는 산책로나 등록된 모든 산책로를 인기순 혹은 별점순으로 정렬할 수 있습니다.
              </ListItem>
              <ListItem>
                <BiChevronRight />
                상단 검색창에서 원하는 산책 장소를 검색하여 해당 위치 근방에 등록된 산책로를 조회할 수 있습니다.
              </ListItem>
              <ListItem>
                <BiChevronRight />
                지도를 드래그하여 위치를 변경한 후 검색창 하단의 '현재 위치에서 검색' 버튼 클릭하면 해당위치 근방의 산책로가 조회됩니다.
              </ListItem>
            </List>
          </StepContent>
        </StepItem>

        <StepItem>
          <StepNumber>3</StepNumber>
          <StepContent>
            검색한 산책로의 상세 정보는 다음과 같은 방법으로 확인할 수 있습니다:
          </StepContent>
        </StepItem>
        <GuideCard>
          <h3>
            <BiMapAlt /> 상세 페이지로 이동하기
          </h3>
          <GuideStep>
            <div className="step-number">1</div>
            <div className="step-content">산책로 카드의 경로 사진을 클릭!</div>
          </GuideStep>
          <NavImg src={cardImage} />
          <GuideStep>
            <div className="step-number">2</div>
            <div className="step-content">
              산책로 카드를 클릭하여 해당 위치로 이동하고, 산책로 이름을 클릭!
            </div>
          </GuideStep>
          <NavImg src={card} />
        </GuideCard>
      </StepList>
    </SectionContent>
  </Section>
));

export default SearchSection;
