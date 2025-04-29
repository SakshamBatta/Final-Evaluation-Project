import SideBar from "../../components/SideBar/SideBar";
import "./Chatbot.css";
import iconStatus from "../../assets/iconStatus.png";
import Avatar from "../../assets/Avatar.png";
import send from "../../assets/send.png";
import cross from "../../assets/cross.png";
import editPencil from "../../assets/editPencil.png";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useChatbot } from "../../context/ChatbotContext";

export default function Chatbot() {
  const {
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
  } = useChatbot();

  const numberRef = useRef(null);

  const headerColors = ["#FFFFFF", "#000000", "#33475B"];
  const backgroundColors = ["#FFFFFF", "#000000", "#EEEEEE"];

  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  const generateNumbers = (max) => {
    return Array.from({ length: max }, (_, i) => i.toString().padStart(2, "0"));
  };

  const itemHeight = 44;

  const handleScroll = (ref, setValue) => {
    const scrollTop = ref.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    setValue(index.toString().padStart(2, "0"));
  };

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

  useEffect(() => {
    if (hoursRef.current) {
      hoursRef.current.scrollTop = parseInt(hours) * itemHeight;
    }

    if (minutesRef.current) {
      minutesRef.current.scrollTop = parseInt(minutes) * itemHeight;
    }

    if (secondsRef.current) {
      secondsRef.current.scrollTop = parseInt(seconds) * itemHeight;
    }
  }, []);
  useEffect(() => {
    if (numberRef.current) {
      const text = numberRef.current.textContent.trim();
      const words = text.split(/\s+/);
      setWelcomeLength(words.length);
    }
  });
  const dataToSend = {
    headerColor,
    backgroundColor,
    customMessage1,
    customMessage2,
    name: customFormData.name,
    phone: customFormData.phone,
    email: customFormData.email,
    buttonText: customFormData.buttonText,
    welcomeMessage,
    hours,
    minutes,
    seconds,
  };

  const handleSave = async () => {
    const res = await axios.post(
      `https://hubly-0zgf.onrender.com/api/chatbot/save`,
      {
        dataToSend,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status === 200) {
      alert("Chatbot settings saved successfully");
    }
  };

  return (
    <>
      <div className="container-dashboard">
        <div className="inner-container-dashboard">
          <SideBar />
          <div className="right-inner-dashboard-contact">
            <div className="chatbot-container">
              <h3 className="heading-dashboard">Chat Bot</h3>
              <div className="chatbot-main-content">
                <div className="chatbot-preview">
                  <div className="chatbot-view">
                    <div
                      className="view-header"
                      style={{ backgroundColor: headerColor }}
                    >
                      <div className="inner-header">
                        <img src={iconStatus} alt="" />
                        <p>Hubly</p>
                      </div>
                    </div>
                    <div
                      className="view-main"
                      style={{ backgroundColor: backgroundColor }}
                    >
                      <div className="view-main-div1">
                        <img src={Avatar} alt="" />
                        <div className="custom-message">
                          <div className="message1">{customMessage1}</div>
                          <div className="message2">{customMessage2}</div>
                        </div>
                      </div>
                      <div className="view-main-div2">
                        <h4>Introduce Yourself</h4>
                        <form className="chatbot-introduction-form">
                          <label>Your name</label>
                          <input type="text" value={customFormData.name} />
                          <hr />
                          <label>Your Phone</label>
                          <input type="text" value={customFormData.phone} />
                          <hr />
                          <label>Your Email</label>
                          <input type="text" value={customFormData.email} />
                          <hr />
                          <button>{customFormData.buttonText}</button>
                        </form>
                      </div>
                      <div className="view-main-div3">
                        <input type="text" placeholder="Write a message" />
                        <img src={send} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="welcome-msg-div">
                    <div className="welcome">
                      <img className="welcome-img" src={Avatar} alt="" />
                      <p>{welcomeMessage}</p>
                      <img className="welcome-cross-img" src={cross} alt="" />
                    </div>
                  </div>
                </div>
                <div className="chatbot-customize">
                  <div className="header-color-card">
                    <h4>Header Color</h4>
                    <div className="header-color-options">
                      {headerColors.map((color, index) => (
                        <div
                          key={index}
                          className="header-color-circle"
                          style={{ backgroundColor: color }}
                          onClick={() => setHeaderColor(color)}
                        />
                      ))}
                    </div>
                    <div className="selected-header-color">
                      <div
                        className="choosen-header-color"
                        style={{ backgroundColor: headerColor }}
                      />
                      <div className="header-color-code">
                        <p>{headerColor}</p>
                      </div>
                    </div>
                  </div>
                  <div className="custom-background-card">
                    <h4>Custom Background Color</h4>
                    <div className="background-color-options">
                      {backgroundColors.map((color, index) => (
                        <div
                          key={index}
                          className="background-color-circle"
                          style={{ backgroundColor: color }}
                          onClick={() => setBackgroundColor(color)}
                        />
                      ))}
                    </div>
                    <div className="selected-background-color">
                      <div
                        className="choosen-background-color"
                        style={{ backgroundColor: backgroundColor }}
                      />
                      <div className="background-color-code">
                        <p>{backgroundColor}</p>
                      </div>
                    </div>
                  </div>
                  <div className="customize-message-card">
                    <h4>Customize Message</h4>
                    <div className="messages-card">
                      <div className="custom-msg-div">
                        <input
                          type="text"
                          className="select-message"
                          value={customMessage1}
                          onChange={(e) => {
                            setCustomMessage1(e.target.value);
                          }}
                        />
                        <img src={editPencil} alt="" />
                      </div>
                      <div className="custom-msg-div">
                        <input
                          type="text"
                          className="select-message"
                          value={customMessage2}
                          onChange={(e) => {
                            setCustomMessage2(e.target.value);
                          }}
                        />
                        <img src={editPencil} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="introduction-form-card">
                    <h4>Introduction Form</h4>
                    <form className="customize-form-card">
                      <label>Your name</label>
                      <input
                        type="text"
                        className="custom-form-input"
                        value={customFormData.name}
                        onChange={(e) => {
                          setCustomFormData({
                            ...customFormData,
                            name: e.target.value,
                          });
                        }}
                      />
                      <hr />
                      <label>Your Phone</label>
                      <input
                        type="text"
                        className="custom-form-input"
                        value={customFormData.phone}
                        onChange={(e) => {
                          setCustomFormData({
                            ...customFormData,
                            phone: e.target.value,
                          });
                        }}
                      />
                      <hr />
                      <label>Your Email</label>
                      <input
                        type="text"
                        className="custom-form-input"
                        value={customFormData.email}
                        onChange={(e) => {
                          setCustomFormData({
                            ...customFormData,
                            email: e.target.value,
                          });
                        }}
                      />
                      <hr />
                      <input
                        className="customize-form-btn"
                        type="text"
                        value={customFormData.buttonText}
                        onChange={(e) => {
                          setCustomFormData({
                            ...customFormData,
                            buttonText: e.target.value,
                          });
                        }}
                      />
                    </form>
                  </div>
                  <div className="welcome-message-card">
                    <h4>Welcome Message</h4>
                    <div className="welcome-message-div">
                      <textarea
                        ref={numberRef}
                        value={welcomeMessage}
                        onChange={(e) => {
                          setWelcomeMessage(e.target.value);
                        }}
                      />
                      <img src={editPencil} alt="" />
                      <p className="length">{welcomeLength}/50</p>
                    </div>
                  </div>
                  <div className="missed-timer-card">
                    <h4>Missed chat timer</h4>
                    <div className="timer-picker">
                      <div
                        ref={hoursRef}
                        className="picker-column"
                        onScroll={() => handleScroll(hoursRef, setHours)}
                      >
                        {generateNumbers(24).map((num) => (
                          <div
                            key={num}
                            className={`picker-item ${
                              hours === num ? "active" : ""
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>

                      <span>:</span>

                      <div
                        ref={minutesRef}
                        className="picker-column"
                        onScroll={() => handleScroll(minutesRef, setMinutes)}
                      >
                        {generateNumbers(60).map((num) => (
                          <div
                            key={num}
                            className={`picker-item ${
                              minutes === num ? "active" : ""
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>

                      <span>:</span>

                      <div
                        ref={secondsRef}
                        className="picker-column"
                        onScroll={() => handleScroll(secondsRef, setSeconds)}
                      >
                        {generateNumbers(60).map((num) => (
                          <div
                            key={num}
                            className={`picker-item ${
                              seconds === num ? "active" : ""
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="missed-timer-btn" onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
