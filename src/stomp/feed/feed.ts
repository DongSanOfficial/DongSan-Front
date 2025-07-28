import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import stompClient from "../stompClient";

export interface FeedPayload {
  memberId: string;
  distanceMeter: string;
  timeMin: string;
  nickname: string;
}

class FeedStompService {
  private client: Client;

  constructor() {
    this.client = stompClient;
  }

  connect(onConnect?: () => void) {
    this.client.onConnect = () => {
      console.log("피드 stomp 연결 성공");
      onConnect?.();
    };

    this.client.onStompError = (frame) => {
      console.error("피드 stomp 에러: ", frame);
    };

    this.client.onWebSocketClose = (event) => {
      console.log("피드 stomp 연결 종료:", event);
    };

    this.client.activate();
  }

  subscribeFeed(
    crewId: number,
    callback: (payload: FeedPayload) => void
  ): StompSubscription {
    const topic = `/topic/walk/crew/${crewId}/detail`;
    return this.client.subscribe(topic, (message: IMessage) => {
      try {
        const body: FeedPayload = JSON.parse(message.body);
        callback(body);
        console.log("피드 메시지 수신:", body);
      } catch (e) {
        console.error("피드 메시지 파싱 실패:", e);
      }
    });
  }

  subscribeAllFeed(
    crewIds: number[],
    callback: (crewId: number, payload: FeedPayload) => void
  ): StompSubscription[] {
    return crewIds.map((crewId) =>
      this.subscribeFeed(crewId, (payload) => callback(crewId, payload))
    );
  }

  disconnect() {
    this.client.deactivate();
  }

  isConnected() {
    return !!this.client.connected;
  }
}

export const feedStompService = new FeedStompService();
