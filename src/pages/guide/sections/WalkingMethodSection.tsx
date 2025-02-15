import React, { forwardRef } from "react";
import { BiWalk } from "react-icons/bi";
import { Section, SectionTitle, SectionContent } from "../styles/CommonStyles";

const WalkingMethodSection = forwardRef<HTMLDivElement>((props, ref) => (
  <Section ref={ref}>
    <SectionTitle $main>
      <BiWalk size={28} />
      동산과 함께 산책하는 방법
    </SectionTitle>
    <SectionContent>
      본 페이지는 사용자 이용 안내에 도움을 주기 위해 제작되었습니다. 실제
      서비스를 이용하면서 보는 화면과 가이드내 이미지는 다를 수 있으니 참고
      바랍니다.
    </SectionContent>
  </Section>
));

export default WalkingMethodSection;
