import { forwardRef } from "react";
import {
  BiMessageAlt,
  BiRun,
} from "react-icons/bi";
import {
  Section,
  SectionTitle,
  SectionContent,
  StepList,
  StepItem,
  StepNumber,
  StepContent,
  GuideCard,
  GuideStep,
  NavImg,
  SubDescription, // 새로 추가된 스타일 컴포넌트
} from "../styles/CommonStyles";
import community from "src/assets/images/guide/community.png";
import createCrew from "src/assets/images/guide/create-crew.png";
import searchCrew from "src/assets/images/guide/search-crew.png";
import createCowalk from "src/assets/images/guide/create-cowalk.png";
import cowalkPost from "src/assets/images/guide/cowalk-post.png";
import cowalkList from "src/assets/images/guide/cowalk-list.png";
import newwayWebsocket from "src/assets/images/guide/newway-websocket.jpg";
import cowalkWebsocket from "src/assets/images/guide/cowalk-websocket.jpg";

const SearchSection = forwardRef<HTMLDivElement>((props, ref) => (
  <Section ref={ref}>
    <SectionTitle>
      <BiMessageAlt size={24} />
      동산 커뮤니티
    </SectionTitle>
    <SectionContent>
      <StepList>
        <StepItem>
          <StepContent>
            커뮤니티에서 크루 활동을 할 수 있어요!
            <NavImg src={community} />
          </StepContent>
        </StepItem>
        <StepItem>
          <StepNumber>1</StepNumber>
          <StepContent>
            크루를 만들어보세요! <br />
            크루의 목적과 규칙을 간단히 설명하면 크루원 모집에 도움이 됩니다.
          </StepContent>
        </StepItem>
        <NavImg src={createCrew} />
        
        <StepItem>
          <StepNumber>2</StepNumber>
          <StepContent>
            크루에 가입해서 크루 활동을 시작하세요! <br />
            검색 아이콘을 눌러, 등록된 모든 크루를 확인하거나 특정 크루를 검색할
            수 있어요. <br />
            공개 크루는 누구나 자유롭게 가입할 수 있고, 비공개 크루는 가입
            비밀번호가 필요합니다.
          </StepContent>
        </StepItem>
        <NavImg src={searchCrew} />
        
        <StepItem>
          <StepNumber>3</StepNumber>
          <StepContent>
            같이산책 일정을 등록해 크루원과 함께 산책해보세요. 일정에 신청하면,
            같이산책 리스트에 추가됩니다.
          </StepContent>
        </StepItem>
        <NavImg src={createCowalk} />
        
        <SubDescription>
          + 등록 아이콘을 클릭하면 같이 산책 일정을 작성할 수 있어요. <br /> 
          산책 예정일과 시작-종료 시간을 입력하고 인원과 간단한 메모를 작성해주세요.
        </SubDescription>
        <NavImg src={cowalkPost} />
        
        <SubDescription>
          최근 올라온 일정을 확인하고 신청해보세요!
        </SubDescription>
        <NavImg src={cowalkList} />
        
        <StepItem>
          <StepNumber>4</StepNumber>
          <StepContent>
            크루 페이지의 피드 탭에서 현재 산책 중인 크루원을 실시간으로 확인할
            수 있어요. <br />
            크루원의 지난 산책 기록도 함께 살펴보세요!
          </StepContent>
        </StepItem>
        
        <StepItem>
          <GuideCard>
            <h3>
              <BiRun /> 함께 산책 중인 크루원 확인하기
            </h3>
            <GuideStep>
              <div className="step-number">1</div>
              <div className="step-content">
                산책을 하면, 가입 크루에서 산책 중인 크루원 수를 실시간으로
                확인할 수 있어요.
              </div>
            </GuideStep>
            <NavImg src={newwayWebsocket} />
            <GuideStep>
              <div className="step-number">2</div>
              <div className="step-content">
                크루 페이지에 있는 같이산책 탭에서 내가 신청한 같이산책 일정을
                확인하고 시작 버튼을 눌러 산책을 하면, 해당 같이산책 일정을
                함께하는 크루원 수를 실시간으로 확인할 수 있어요.
              </div>
            </GuideStep>
            <NavImg src={cowalkWebsocket} />
          </GuideCard>
        </StepItem>
      </StepList>
    </SectionContent>
  </Section>
));

export default SearchSection;