import { Client, IMessage } from "@stomp/stompjs";

export interface OngoingPayload {
  crewIds: number[];
  distanceMeter: number;
  timeMin: number;
}

export interface EndPayload {
  crewId: number;
}

class StompService {
  private client: Client | null = null;

  connect(
    onConnectedCallback?: () => void
  ) {
    this.client = new Client({
      webSocketFactory: () => new WebSocket(`${process.env.REACT_APP_BASE_URL}/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("STOMP 연결 성공");

        if (onConnectedCallback) {
          onConnectedCallback();
        }
      },
      onStompError: (frame) => {
        console.error("STOMP 에러:", frame);
      },
      onWebSocketError: (event) => {
        console.error("웹소켓 연결 오류:", event);
      },
      onWebSocketClose: (event) => {
        console.log("웹소켓 연결 종료:", event);
      },
    });

    this.client.activate();
  }

  // 산책하기: 크루 카운트 SUBSCRIBE
  subscribeCrewCount(crewId: number, callback: (count: number) => void) {
    if (!this.client) return;

    const topic = `/topic/walk/crew/${crewId}/count`;
    this.client.subscribe(topic, (message: IMessage) => {
      try {
        const body = JSON.parse(message.body);
        callback(body.count);
      } catch (e) {
        console.error("메시지 파싱 실패:", e);
      }
    });
  }
  // 산책하기: 유저 산책 정보 SEND
  sendOngoing(payload: OngoingPayload) {
    if (!this.client || !this.client.connected) {
      console.log("stomp client not connected. Skipping send.");
      return;
    }

    console.log("sending ongoing payload:", payload);

    this.client.publish({
      destination: "/app/walk/ongoing",
      body: JSON.stringify(payload),
    });
  }

  // 산책하기: 산책하기 중단시 연결 해제
  sendEnd(payload: EndPayload) {
    if (!this.client || !this.client.connected) {
      console.log("stomp client not connected. Skipping send.");
      return;
    }

    this.client.publish({
      destination: "/app/walk/end",
      body: JSON.stringify(payload),
    });
  }

  isConnected() {
    return !!this.client?.connected;
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
  }
}

const stompService = new StompService();

export default stompService;
