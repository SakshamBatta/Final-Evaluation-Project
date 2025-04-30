import "./Chat.css";
import { useEffect, useState } from "react";
import chat from "../../assets/chat.png";
import chatCancel from "../../assets/chatCancel.png";
import iconStatus from "../../assets/iconStatus.png";
import Avatar from "../../assets/Avatar.png";
import send from "../../assets/send.png";
import { useChatbot } from "../../context/ChatbotContext";
import axios from "axios";

export default function Chat({ isChatOpen, setIsChatOpen }) {
  const {
    headerColor,
    backgroundColor,
    customMessage1,
    customMessage2,
    customFormData,
    setBackgroundColor,
    setHeaderColor,
    setCustomMessage1,
    setCustomMessage2,
    setCustomFormData,
    setHours,
    setMinutes,
    setSeconds,
    setWelcomeMessage,
  } = useChatbot();

  const [chatOpen, setChatOpen] = useState(false);
  const [userFormData, setUserFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [userMessage, setUserMessage] = useState("");
  const [ticketCreated, setTicketCreated] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (id) => {
    try {
      const res = await axios.get(
        `https://hubly-0zgf.onrender.com/api/ticket/${id}/messages`
      );
      setMessages(res.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://hubly-0zgf.onrender.com/api/ticket/create`,
        {
          name: userFormData.name,
          phone: userFormData.phone,
          email: userFormData.email,
        }
      );
      setTicketCreated(true);
      setTicketId(response.data.existingTicket._id);
      localStorage.setItem("ticketId", response.data.existingTicket._id);
      fetchMessages(response.data.existingTicket._id);
    } catch (error) {
      console.error(
        "Ticket create error:",
        error?.response?.data || error.message
      );
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post(
      `https://hubly-0zgf.onrender.com/api/ticket/${ticketId}/message`,
      {
        text: userMessage,
      }
    );
    setUserMessage("");
    fetchMessages(ticketId);
  };

  useEffect(() => {
    const existingTicketId = localStorage.getItem("ticketId");
    if (existingTicketId) {
      setTicketCreated(true);
      setTicketId(existingTicketId);
      fetchMessages(existingTicketId);
    }
  }, []);

  useEffect(() => {
    const fetchChabotSettings = async () => {
      const res = await axios.get(
        `https://hubly-0zgf.onrender.com/api/chatbot/get`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data.chatbot;

      if (data) {
        setHeaderColor(data.headerColor || "#33475b");
        setBackgroundColor(data.backgroundColor || "#EEEEEE");
        setCustomMessage1(data.customMessage1 || "How can i help you?");
        setCustomMessage2(data.customMessage2 || "Ask me anything!");
        setCustomFormData({
          name: data.name || "Your name",
          phone: data.phone || "+1(000) 000-0000",
          email: data.email || "example@gmail.com",
          buttonText: data.buttonText || "Thank You!",
        });
        setWelcomeMessage(
          data.welcomeMessage ||
            "👋 Want to chat about Hubly? I'm an\n chatbot here to help you find your way."
        );
        setHours(data.hours || "00");
        setMinutes(data.minutes || "10");
        setSeconds(data.seconds || "00");
      }
    };

    fetchChabotSettings();
  }, []);
  return (
    <>
      <div className="chatbot-div-chat">
        <img
          className="chatbot-icon-chat"
          src={!chatOpen ? chat : chatCancel}
          alt=""
          onClick={() => {
            setChatOpen(!chatOpen);
            setIsChatOpen(!isChatOpen);
          }}
        />

        {chatOpen && (
          <div className="chatbot-popup-chat">
            <div
              className="view-header-chat"
              style={{ backgroundColor: headerColor }}
            >
              <div className="inner-header-chat">
                <img src={iconStatus} alt="" />
                <p>Hubly</p>
              </div>
            </div>
            <div className="chat-content-wrapper">
              <div
                className="view-main-chat"
                style={{ backgroundColor: backgroundColor }}
              >
                <div className="view-main-div1-chat">
                  <img src={Avatar} alt="" />
                  <div className="custom-message-chat">
                    <div className="message1-chat">{customMessage1}</div>
                    <div className="message2-chat">{customMessage2}</div>
                  </div>
                </div>
                <div className="view-main-div2-chat">
                  <h4>Introduce Yourself</h4>
                  <form className="chatbot-introduction-form-chat">
                    <label>Your name</label>
                    <input
                      type="text"
                      value={userFormData.name}
                      placeholder={customFormData.name}
                      onChange={(e) => {
                        setUserFormData({
                          ...userFormData,
                          name: e.target.value,
                        });
                      }}
                    />
                    <hr />
                    <label>Your Phone</label>
                    <input
                      type="text"
                      value={userFormData.phone}
                      placeholder={customFormData.phone}
                      onChange={(e) => {
                        setUserFormData({
                          ...userFormData,
                          phone: e.target.value,
                        });
                      }}
                    />
                    <hr />
                    <label>Your Email</label>
                    <input
                      type="text"
                      value={userFormData.email}
                      placeholder={customFormData.email}
                      onChange={(e) => {
                        setUserFormData({
                          ...userFormData,
                          email: e.target.value,
                        });
                      }}
                    />
                    <hr />
                    <button onClick={handleSave}>
                      {customFormData.buttonText}
                    </button>
                  </form>
                </div>
                <div className="chat-messages-container">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message-bubble ${
                        msg.sender === "admin" ? "left" : "right"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="view-main-div3-chat">
                <input
                  type="text"
                  placeholder="Write a message"
                  disabled={!ticketCreated}
                  value={userMessage}
                  onChange={(e) => {
                    setUserMessage(e.target.value);
                  }}
                />
                <img src={send} alt="" onClick={sendMessage} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
