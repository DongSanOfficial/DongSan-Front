import styled from "styled-components";

interface SectionTitleProps {
  $main?: boolean;
}

export const Section = styled.div`
  scroll-margin-top: 80px;
  background: ${(props) => props.theme.White};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h2<SectionTitleProps>`
  font-size: ${(props) => (props.$main ? "26px" : "22px")};
  font-weight: 700;
  margin-bottom: ${(props) => (props.$main ? "24px" : "20px")};
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${(props) => props.theme.Green700};

  svg {
    color: ${(props) => props.theme.Green300};
  }
`;

export const SectionContent = styled.div`
  color: ${(props) => props.theme.Gray700};
  line-height: 1.7;
  font-size: 15px;
`;

export const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 24px 0;
`;

export const StepItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

export const StepNumber = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.Green600} 0%,
    ${(props) => props.theme.Green300} 100%
  );
  color: ${(props) => props.theme.White};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(20, 107, 83, 0.2);
`;

export const StepContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
`;

export const ListItem = styled.li`
  color: ${(props) => props.theme.Gray700};
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: ${(props) => props.theme.Gray100};
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.Gray200};
    transform: translateX(4px);
  }

  svg {
    color: ${(props) => props.theme.Green300};
    flex-shrink: 0;
    font-size: 20px;
  }
`;

export const GuideCard = styled.div`
  background-color: ${(props) => props.theme.White};
  border: 1px solid ${(props) => props.theme.Gray200};
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.Green700};
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const GuideStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px dashed ${(props) => props.theme.Gray200};

  &:last-child {
    border-bottom: none;
  }

  .step-number {
    background-color: ${(props) => props.theme.Green100};
    color: ${(props) => props.theme.Green700};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;
  }
`;

export const InfoBox = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.Green50} 0%,
    ${(props) => props.theme.Green100} 100%
  );
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
  border: 1px solid ${(props) => props.theme.Green200};

  p {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    line-height: 1.5;

    div {
      flex: 1;
    }

    strong {
      color: ${(props) => props.theme.Green700};
      font-weight: 600;
      display: block;
      margin-bottom: 4px;
    }
  }
`;

export const NavImg = styled.img`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
`;
