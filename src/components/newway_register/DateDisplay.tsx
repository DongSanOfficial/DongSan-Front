import { BiCalendarCheck, BiMapPin } from "react-icons/bi";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const Date = styled.div`
  color: ${theme.Green500};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;
export default function DateDisplay() {
  return (
    <Date>
      <BiCalendarCheck
        style={{ color: "black", width: "27px", height: "27px" }}
      />
      2024.09.26 오후 13:25
    </Date>
  );
}
