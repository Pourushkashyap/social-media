import jwt from "jsonwebtoken"
import { Message } from "../model/Message.js";

const userSocketMap = new Map();

const socketmiddleware = (io) => {
  io.use((socket, next) => {
    let token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error: token missing"));

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.userId = decoded._id;
      socket.username = decoded.username || decoded.email || "Guest";
      next();
    } catch (err) {
      console.log("JWT verify error:", err.message);
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`user connected: ${socket.username} (${socket.userId})`);
    userSocketMap.set(socket.username, socket.id);

    // Send undelivered messages
    try {
      const undelivered = await Message.find({
        receiver: socket.username,
        delivered: false,
      }).sort({ timestamp: 1 });

      for (const msg of undelivered) {
        io.to(socket.id).emit("receive-message", {
          sender: msg.sender,
          message: msg.message,
          timestamp: msg.timestamp,
        });
        msg.delivered = true;
        await msg.save();
      }
    } catch (err) {
      console.log("Error fetching undelivered messages:", err);
    }

    // ✅ Fetch chat history
    socket.on("get-messages", async ({ withUser }) => {
      try {
        const messages = await Message.find({
          $or: [
            { sender: socket.username, receiver: withUser },
            { sender: withUser, receiver: socket.username },
          ],
        }).sort({ timestamp: 1 });

        socket.emit("messages-history", messages); // ✅ match frontend
      } catch (err) {
        console.log("Error fetching messages: ", err);
      }
    });

    // ✅ Handle new message
    socket.on("send-message", async ({ to, message }) => {
      try {
        const newMessage = new Message({
          sender: socket.username,
          receiver: to,
          message,
          delivered: false,
          timestamp: new Date(),
        });
        await newMessage.save();

        const targetSocketId = userSocketMap.get(to);

        if (targetSocketId) {
          io.to(targetSocketId).emit("receive-message", { // ✅ same event as frontend
            sender: socket.username,
            message,
            timestamp: newMessage.timestamp,
          });

          newMessage.delivered = true;
          await newMessage.save();
        }
      } catch (err) {
        console.log("Error sending message:", err);
      }
    });

    socket.on("disconnect", () => {
      userSocketMap.delete(socket.username);
      console.log(`user disconnected: ${socket.username}`);
    });
  });
};

export default socketmiddleware;
