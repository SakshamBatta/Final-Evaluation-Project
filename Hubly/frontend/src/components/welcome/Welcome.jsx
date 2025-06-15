import { useEffect, useState } from "react";
import Avatar from "../../assets/Avatar.png";
import cross from "../../assets/cross.png";
import axios from "axios";
import "./Welcome.css";

export default function Welcome() {
  const [welcomeMessage, setWelcomeMessage] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchChabotSettings = async () => {
      const res = await axios.get(
        `https://hubly-7rev.onrender.com/api/chatbot/get-message`
      );
      const data = res.data.message;

      setWelcomeMessage(data);
    };

    fetchChabotSettings();
  }, []);

  return (
    <>
      {visible && (
        <div className="welcome-msg-div-comp">
          <div className="welcome-comp">
            <img className="welcome-img-comp" src={Avatar} alt="" />
            <p>{welcomeMessage}</p>
            <img
              className="welcome-cross-img-comp"
              src={cross}
              alt=""
              onClick={() => setVisible(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
