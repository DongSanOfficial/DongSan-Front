import { Client } from "@stomp/stompjs";

const stompClient = new Client({
  webSocketFactory: () => new WebSocket(`${process.env.REACT_APP_BASE_URL}/ws`),
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

export default stompClient;
