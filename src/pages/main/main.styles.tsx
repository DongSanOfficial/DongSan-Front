import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const MainContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const SearchBarContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    max-width: 100%;
    top: 25px;
    gap: 12px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 600px;
    top: 30px;
  }
`;

const BottomSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const FixedHeader = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  flex-shrink: 0;
`;

const PathCardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px 0 70px 0;
  overflow-y: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${theme.Black};
  font-size: 1rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 1rem;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 30px 0;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    margin: 40px 0;
  }
`;

const IconWrapper = styled.div`
  background-color: ${theme.Gray100};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const NoWalkwaysMessage = styled.p`
  font-size: 16px;
  color: ${theme.Gray700};
  text-align: center;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
`;

const ViewAllButton = styled.button`
  background-color: ${theme.Green300};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 25px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 30px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const S = {
  MainContainer,
  SearchBarContainer,
  BottomSheetContainer,
  FixedHeader,
  PathCardList,
  ErrorMessage,
  LoadingSpinner,
  EmptyStateContainer,
  IconWrapper,
  NoWalkwaysMessage,
  ViewAllButton,
};
export default S;
