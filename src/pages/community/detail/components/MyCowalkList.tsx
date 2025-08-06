import styled from "styled-components";
import icon from "src/assets/svg/FootPrint.svg";
import { theme } from "src/styles/colors/theme";
import { useNavigate } from "react-router-dom";
import { cowalkStompService } from "src/stomp/cowalk/cowalk";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1rem;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 2rem 0.5rem 0;
`;

const AlertBtn = styled.button<{ isNow: boolean }>`
  background-color: ${({ isNow }) => (isNow ? `${theme.Green500}` : "#f0f0f0")};
  border: none;
  border-radius: 25px;
  width: 4.5rem;
  height: 2rem;
  font-size: 16px;
  color: ${({ isNow }) => (isNow ? "white" : "#333")};
`;

interface MyCowalkListProps {
  startedAt: string;
  endedAt: string;
  cowalkId: number;
}

export default function MyCowalkList({
  startedAt,
  endedAt,
  cowalkId,
}: MyCowalkListProps) {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`[MyCowalkList] ${cowalkId} 컴포넌트 마운트됨`);
    return () => {
      console.log(`[MyCowalkList] ${cowalkId} 언마운트 및 WebSocket 연결 해제`);
      cowalkStompService.disconnect();
    };
  }, []);

  const startedDate = new Date(startedAt);

  const year = startedDate.getFullYear();
  const month = (startedDate.getMonth() + 1).toString().padStart(2, "0");
  const date = startedDate.getDate().toString().padStart(2, "0");
  const hour = startedDate.getHours().toString().padStart(2, "0");
  const minute = startedDate.getMinutes().toString().padStart(2, "0");

  const formatted = `${year}-${month}-${date} ${hour}시 ${minute}분`;

  const now = new Date();
  const isNow = now >= startedDate && now <= new Date(endedAt);
  const handleClick = () => {
    console.log("연결상태: ", isConnected);
    if (!isConnected) {
      cowalkStompService.connect(() => {
        console.log(`[MyCowalkList] ${cowalkId} WebSocket 연결 성공`);
        setIsConnected(true);

        // 연결이 완료된 후에만 sendOngoing과 navigate 실행
        cowalkStompService.sendOngoing(cowalkId);
        navigate("/newway", { state: { mode: "cowalk", cowalkId } });
      });
    } else {
      cowalkStompService.sendOngoing(cowalkId);
      navigate("/newway", { state: { mode: "cowalk", cowalkId } });
    }
  };
  return (
    <Wrapper>
      <img src={icon} alt="산책 아이콘" />
      <Content>{formatted}</Content>
      <AlertBtn isNow={isNow} onClick={handleClick}>
        시작
      </AlertBtn>
    </Wrapper>
  );
}
