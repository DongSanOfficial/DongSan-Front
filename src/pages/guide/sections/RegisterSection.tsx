import React, { forwardRef } from "react";
import { BiMapAlt } from "react-icons/bi";
import {
  Section,
  SectionTitle,
  SectionContent,
  StepList,
  StepItem,
  StepNumber,
  StepContent,
  NavImg,
} from "../styles/CommonStyles";
import newway from "src/assets/images/guide/newway.png";
import newwayGuide from "src/assets/images/guide/newwayGuide.png";
import { theme } from "src/styles/colors/theme";

const RegisterSection = forwardRef<HTMLDivElement>((props, ref) => (
  <Section ref={ref}>
    <SectionTitle>
      <BiMapAlt size={24} />
      산책 및 산책로 등록
    </SectionTitle>
    <SectionContent>
      <StepList>
        <StepItem>
          <StepNumber>1</StepNumber>
          <StepContent>
            하단 네비게이션의 첫 번째 아이콘을 눌러 산책 페이지로 이동합니다.
            <NavImg src={newway} />
          </StepContent>
        </StepItem>

        <StepItem>
          <StepNumber>2</StepNumber>
          <StepContent>
            지도 상에 마커가 현재 위치와 일치하면 등록 페이지 우측 하단의 산책
            시작 버튼을 눌러 산책이 시작합니다.
          </StepContent>
        </StepItem>

        <StepItem>
          <StepNumber>3</StepNumber>
          <StepContent>
            산책을 완료했다면, 산책 중단 버튼을 눌러 등록 페이지로 이동할 수
            있습니다.
            <div
              style={{
                marginTop: "8px",
                color: theme.Green300,
                fontWeight: "500",
              }}
            >
              ※ 5분 이상, 200m 이상 산책해야만 산책로를 등록할 수 있습니다.
            </div>
            <NavImg src={newwayGuide} />
          </StepContent>
        </StepItem>

        <StepItem>
          <StepNumber>4</StepNumber>
          <StepContent>
            산책로 등록 페이지로 이동하면 산책로의 이름, 설명, 해시태그를 입력할
            수 있습니다. 전체공개 여부 토글을 눌러 공개여부를 선택할 수
            있습니다.
          </StepContent>
        </StepItem>
      </StepList>
    </SectionContent>
  </Section>
));

export default RegisterSection;
