import { io } from "socket.io-client";

let socket = null;

export const initSocket = (token) => {
  if (!socket) {
    socket = io("http://localhost:9000", {
      transports: ["websocket"],
      auth: { token },
    });
  }
  return socket;
};

export const getSocket = () => socket;
