import { BiCalendarCheck } from "react-icons/bi";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const DateContainer = styled.div`
 color: ${theme.Green500};
 font-weight: 600;
 display: flex;
 align-items: center; 
 gap: 4px;
 @media (max-width: 375px) {
   width: 300px;
 }
`;

export default function DateDisplay() {
 const now = new Date(); 
 
 const formatDate = () => {
   const year = now.getFullYear();
   const month = (now.getMonth() + 1).toString().padStart(2, '0');
   const day = now.getDate().toString().padStart(2, '0');
   const hours = now.getHours();
   const minutes = now.getMinutes().toString().padStart(2, '0');
   const ampm = hours >= 12 ? '오후' : '오전';
   const displayHours = hours > 12 ? hours - 12 : hours;

   return `${year}.${month}.${day} ${ampm} ${displayHours}:${minutes}`;
 };

 return (
   <DateContainer>
     <BiCalendarCheck style={{ color: "black", width: "27px", height: "27px" }} />
     {formatDate()}
   </DateContainer>
 );
}