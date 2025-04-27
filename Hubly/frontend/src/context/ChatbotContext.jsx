import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [headerColor, setHeaderColor] = useState("#33475b");
  const [backgroundColor, setBackgroundColor] = useState("#EEEEEE");
  const [customMessage1, setCustomMessage1] = useState("How can i help you?");
  const [customMessage2, setCustomMessage2] = useState("Ask me anything!");
  const [customFormData, setCustomFormData] = useState({
    name: "Your name",
    phone: "+1(000) 000-0000",
    email: "example@gmail.com",
    buttonText: "Thank You!",
  });
  const [welcomeMessage, setWelcomeMessage] = useState(
    "👋 Want to chat about Hubly? I'm an\n chatbot here to help you find your way."
  );
  const [welcomeLength, setWelcomeLength] = useState(0);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("00");

  return (
    <ChatbotContext.Provider
      value={{
        headerColor,
        setHeaderColor,
        backgroundColor,
        setBackgroundColor,
        customMessage1,
        setCustomMessage1,
        customMessage2,
        setCustomMessage2,
        customFormData,
        setCustomFormData,
        welcomeMessage,
        setWelcomeMessage,
        welcomeLength,
        setWelcomeLength,
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => useContext(ChatbotContext);
