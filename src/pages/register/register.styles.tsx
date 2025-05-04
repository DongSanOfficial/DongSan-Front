import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const Wrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 15px 30px;
    max-width: 100%;
    margin: 0 auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    padding: 20px 40px;
    max-width: 1024px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin-bottom: 15px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.disabled
      ? theme.Gray400
      : props.isActive
      ? theme.Green500
      : theme.Gray400};
  color: #ffffff;
  width: 100%;
  min-height: 52px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? theme.Gray400
        : props.isActive
        ? theme.Green600
        : theme.Gray500};
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    min-height: 58px;
    font-size: 18px;
    border-radius: 6px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 800px;
  }
`;

const TagInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 4px;
  width: 80vw;
  max-width: 322px;
  margin-bottom: 20px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    max-width: 420px;
    gap: 6px;
    margin: 6px;
    margin-bottom: 25px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 500px;
  }
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  width: 90%;
  padding: 6px 0;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 14px;
    padding: 8px 0;
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background-color: ${theme.Gray400};
  color: white;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  gap: 4px;

  &:hover {
    opacity: 0.9;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 8px 14px;
    font-size: 14px;
    border-radius: 24px;
    gap: 6px;
  }
`;

const DeleteIcon = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 16px;
    margin-left: 6px;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 10px;
    margin-top: 10px;
  }
`;

const PathMapContainer = styled.div`
  width: 100%;
  min-height: 300px;
  margin-bottom: 10px;
  border-radius: 15px;
  overflow: hidden;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    min-height: 350px;
    margin-bottom: 15px;
    border-radius: 20px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    min-height: 400px;
  }
`;

const S = {
  Wrapper,
  ContentWrapper,
  Content,
  Button,
  TagInputWrapper,
  TagInput,
  Tag,
  DeleteIcon,
  TagList,
  PathMapContainer,
};
export default S;
