import stompClient from "../stompClient";
import { Client, IMessage } from "@stomp/stompjs";

export interface OngoingPayload {
  crewIds: number[];
  distanceMeter: number;
  timeMin: number;
}

export interface EndPayload {
  crewId: number;
}

class NewwayStompService {
  private client: Client;

  constructor() {
    this.client = stompClient;
  }

  connect(onConnected?: () => void) {
    this.client.onConnect = () => {
      console.log("산책 stomp 연결 성공");
      onConnected?.();
    };

    this.client.onStompError = (frame) => {
      console.error("산책 stomp 에러:", frame);
    };

    this.client.onWebSocketClose = (event) => {
      console.log("산책 stomp 연결 종료:", event);
    };

    this.client.activate();
  }

  subscribeCrewCount(crewId: number, callback: (count: number) => void) {
    const topic = `/topic/walk/crew/${crewId}/count`;
    this.client.subscribe(topic, (message: IMessage) => {
      try {
        const body = JSON.parse(message.body);
        callback(body.count);
      } catch (e) {
        console.error("산책 메시지 파싱 실패:", e);
      }
    });
  }

  sendOngoing(payload: OngoingPayload) {
    if (!this.client.connected) return;
    this.client.publish({
      destination: "/app/walk/ongoing",
      body: JSON.stringify(payload),
    });
  }

  sendEnd(payload: EndPayload) {
    if (!this.client.connected) return;
    this.client.publish({
      destination: "/app/walk/end",
      body: JSON.stringify(payload),
    });
  }

  disconnect() {
    this.client.deactivate();
  }

  isConnected() {
    return !!this.client.connected;
  }
}

export const newwayStompService = new NewwayStompService();
