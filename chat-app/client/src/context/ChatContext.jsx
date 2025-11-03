// ChatContext.jsx
import { createContext, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

// ✅ Setup backend base URL with fallback
const backendUrl =
  import.meta.env.VITE_BACKEND_URL?.trim() || "http://localhost:5000";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // for cookies if needed

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // ✅ Helper function to get headers safely
  const getAuthHeaders = () =>
    token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  // ✅ Fetch all users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users", getAuthHeaders());
      const data = res.data;

      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.warn("⚠️ Unexpected response:", data);
        toast.error(data.message || "Failed to fetch users from server");
      }
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
      toast.error(err.response?.data?.message || "Failed to fetch users");
    }
  };

  // ✅ Fetch messages for selected user
  const getMessages = async (userId) => {
    if (!userId) return;

    try {
      const res = await axios.get(`/api/messages/${userId}`, getAuthHeaders());
      const data = res.data;

      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        toast.error(data.message || "Failed to fetch messages");
      }
    } catch (err) {
      console.error("❌ Failed to fetch messages:", err);
      toast.error(err.response?.data?.message || "Failed to fetch messages");
    }
  };

  // ✅ Send a new message
  const sendMessage = async (msgText) => {
    if (!selectedUser) return;

    try {
      // backend expects { message: "text" }
      const messageBody = { message: msgText };

      const res = await axios.post(
        `/api/messages/${selectedUser._id}`,
        messageBody,
        getAuthHeaders()
      );

      const data = res.data;

      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error("❌ Failed to send message:", err);
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        getUsers,
        users,
        selectedUser,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
        onlineUsers,
        setOnlineUsers,
        messages,
        getMessages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
