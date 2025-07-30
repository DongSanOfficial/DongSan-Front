import { Client, IMessage } from "@stomp/stompjs";
import stompClient from "../stompClient";

export interface CowalkCountPayLoad {
  count: number;
}

class CowalkStompService {
  private client: Client;
  constructor() {
    this.client = stompClient;
  }
  connect(onConnected?: () => void) {
    this.client.onConnect = () => {
      console.log("같이산책 stomp 연결 성공");
      onConnected?.();
    };
    this.client.onStompError = (frame) => {
      console.error("같이산책 stomp 에러:", frame);
    };
    this.client.onWebSocketClose = (event) => {
      console.log("같이산책 stomp 연결 종료:", event);
    };
    this.client.activate();
  }
  disconnect() {
    this.client.deactivate();
  }

  sendOngoing(cowalkId: number) {
    const destination = `/app/cowalk/${cowalkId}/ongoing`;
    this.client.publish({ destination, body: JSON.stringify({}) });
    console.log("같이산책 ongoing 전송 완료");
  }

  sendEnd(cowalkId: number) {
    const destination = `/app/cowalk/${cowalkId}/end`;
    this.client.publish({ destination, body: JSON.stringify({}) });
    console.log("같이산책 end 전송 완료");
  }

  subscribeCowalkCount(
    cowalkId: number,
    callback: (payload: CowalkCountPayLoad) => void
  ) {
    const topic = `/topic/walk/cowalk/${cowalkId}/count`;
    this.client.subscribe(topic, (message: IMessage) => {
      try {
        const payload: CowalkCountPayLoad = JSON.parse(message.body);
        callback(payload);
      } catch (e) {
        console.error("같이산책 카운트 메시지 파싱 실패:", e);
      }
    });
  }
}
export const cowalkStompService = new CowalkStompService();
