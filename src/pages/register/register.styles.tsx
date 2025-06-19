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
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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
`;

const RequiredMark = styled.span`
  color: ${theme.Red300};
  margin-left: 2px;
`;

const TagInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 4px;
  width: 80vw;
  max-width: 322px;
  margin-bottom: 20px;
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  width: 90%;
  padding: 6px 0;
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
`;

const DeleteIcon = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const PathMapContainer = styled.div`
  width: 100%;
  min-height: 300px;
  margin-bottom: 10px;
  border-radius: 15px;
  overflow: hidden;
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
  RequiredMark
};
export default S;
