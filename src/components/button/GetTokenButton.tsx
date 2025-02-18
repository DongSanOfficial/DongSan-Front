import instance from "src/apis/instance";
import React, { useState } from "react";
import styled from "styled-components";

const DevContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const DevInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const DevButton = styled.button`
  padding: 15px 20px;
  border-radius: 8px;
  background-color: #6b7280;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;

  &:hover {
    background-color: #4b5563;
  }
`;

export default function GetTokenButton() {
  const [memberId, setMemberId] = useState("");

  const handleDevToken = async () => {
    if (!memberId || isNaN(Number(memberId))) {
      alert("유효한 ID를 입력해주세요.");
      return;
    }

    try {
      await instance.post("/dev/token", {
        memberId: Number(memberId),
      });

      alert("개발용 토큰이 발급되었습니다.");
      setMemberId("");
    } catch (error) {
      console.error("개발용 토큰 발급 실패:", error);
      alert("토큰 발급에 실패했습니다.");
    }
  };

  return (
    <DevContainer>
      <DevInput
        type="number"
        placeholder="Member ID"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />
      <DevButton onClick={handleDevToken}>토큰발급</DevButton>
    </DevContainer>
  );
}
