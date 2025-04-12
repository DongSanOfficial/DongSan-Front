import React, { forwardRef } from "react";
import { BiWalk, BiInfoCircle, BiCheckCircle } from "react-icons/bi";
import {
  Section,
  SectionTitle,
  SectionContent,
  StepList,
  StepContent,
  GuideCard,
  GuideStep,
  InfoBox,
  NavImg,
} from "../styles/CommonStyles";
import follow from "src/assets/images/guide/follow.png";

const FollowGuideSection = forwardRef<HTMLDivElement>((props, ref) => (
  <Section ref={ref}>
    <SectionTitle>
      <BiWalk size={24} />
      산책로 이용
    </SectionTitle>
    <SectionContent>
      <StepList>
        <StepContent>
          산책로 상세 페이지에서 '이용하기' 버튼을 클릭하면 따라걷기 페이지로
          이동합니다.
          <NavImg src={follow} />
        </StepContent>

        <div>
          <h3>
            <BiWalk /> 따라걷기 시작하기
          </h3>
          <GuideStep>
            <div className="step-number">1</div>
            <div className="step-content">출발지 근처 10m 이내로 이동</div>
          </GuideStep>
          <GuideStep>
            <div className="step-number">2</div>
            <div className="step-content">
              '따라걷기' 버튼을 클릭하여 산책 시작
            </div>
          </GuideStep>
          <GuideStep>
            <div className="step-number">3</div>
            <div className="step-content">산책로를 따라 걸으며 경로 확인</div>
          </GuideStep>
        </div>

        <GuideCard>
          <h3>
            <BiInfoCircle /> 산책로 이용 조건
          </h3>
          <InfoBox>
            <p>
              <BiCheckCircle size={20} />
              <div>
                <strong>산책로를 이용하려면</strong>
                <div>
                  이용하려는 산책로의 출발지와 10m 이내에 있어야 따라걷기가
                  가능합니다.
                </div>
              </div>
            </p>
            <p>
              <BiCheckCircle size={20} />
              <div>
                <strong>리뷰 작성 조건</strong>
                <div>
                  이용하는 산책로 길이의 2/3 이상을 걸어야 리뷰를 작성할 수
                  있습니다.
                </div>
              </div>
            </p>
            <p>
              <BiCheckCircle size={20} />
              <div>
                2/3 이상 걷지 않으면 리뷰작성 버튼이 보이지 않으니 참고해
                주세요!
              </div>
            </p>
          </InfoBox>
        </GuideCard>
      </StepList>
    </SectionContent>
  </Section>
));

export default FollowGuideSection;
