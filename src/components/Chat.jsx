import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseURL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const scrollRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      setLoading(true);
      const chat = await axios.get(BaseURL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // Auto-scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 h-[calc(100vh-180px)] flex flex-col">
      <div className="flex-1 flex flex-col rounded-2xl bg-base-200 border border-white/10 shadow-lg overflow-hidden">

        {/* ================= HEADER ================= */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center text-sm font-semibold text-indigo-300">
            {messages.find((m) => m.firstName !== user?.firstName)?.firstName?.[0] || "?"}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {messages.find((m) => m.firstName !== user?.firstName)?.firstName || "Chat"}
            </p>
            <p className="text-xs text-white/40">Active conversation</p>
          </div>
        </div>

        {/* ================= MESSAGES ================= */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-spinner loading-md text-indigo-500" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-1">
              <p className="text-sm text-white/50">No messages yet</p>
              <p className="text-xs text-white/30">Say hello to start the conversation</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMine = user.firstName === msg.firstName;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
                >
                  <span className="text-xs text-white/40 mb-1 px-1">
                    {msg.firstName} {msg.lastName}
                  </span>
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMine
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : "bg-base-300 text-white/90 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
          <div ref={scrollRef} />
        </div>

        {/* ================= INPUT ================= */}
        <div className="px-5 py-4 border-t border-white/10 flex items-center gap-3">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 rounded-lg bg-base-300/60 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;