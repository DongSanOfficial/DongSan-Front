import { useState } from "react";
import { theme } from "src/styles/colors/theme";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 3rem;
  border-radius: 24px;
  border: 2px solid ${theme.Green500};
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputComment = styled.input`
  border: none;
  background-color: transparent;
  height: 2.5rem;
  width: 84%;
  outline: none;
`;

const SendBtn = styled.button`
  border: none;
  background-color: transparent;
  color: ${theme.Green500};
  font-size: 14px;
  font-weight: 600;
  width: auto;
  height: 2.5rem;
  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

interface CommentBtnProps {
  onSubmit: (comment: string, clear: () => void) => void;
}

export default function CommentBtn({ onSubmit }: CommentBtnProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(comment, () => setComment(""));
  };

  return (
    <Wrapper>
      <InputComment
        placeholder="댓글을 남겨주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <SendBtn onClick={handleSubmit}>보내기</SendBtn>
    </Wrapper>
  );
}
