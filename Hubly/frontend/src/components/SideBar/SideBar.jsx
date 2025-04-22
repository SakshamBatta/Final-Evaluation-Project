import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dashLogo from "../../assets/dashLogo.png";
import contact from "../../assets/contact.png";
import analytics from "../../assets/analytics.png";
import chatBot from "../../assets/chatBot.png";
import team from "../../assets/team.png";
import homeSymbol from "../../assets/homeSymbol.png";
import settings from "../../assets/settings.png";

export default function SideBar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      id: "Dashboard",
      img: homeSymbol,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "Contact Center",
      img: contact,
      label: "Contact Center",
      path: "/contact",
    },
    { id: "Analytics", img: analytics, label: "Analytics", path: "/analytics" },
    { id: "Chat bot", img: chatBot, label: "Chat bot", path: "/chatbot" },
    { id: "Team", img: team, label: "Team", path: "/team" },
    { id: "Setting", img: settings, label: "Setting", path: "/settings" },
  ];

  useEffect(() => {
    const matchedTab = tabs.find((tab) =>
      location.pathname.startsWith(tab.path)
    );
    if (matchedTab) {
      setActiveTab(matchedTab.id);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="left-inner-dashboard">
        <img src={dashLogo} alt="" className="dashboard-logo" />

        <div className="sidebar">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`sidebar-icon ${
                activeTab === tab.id ? "active" : ""
              } `}
              onClick={() => {
                navigate(tab.path);
              }}
            >
              <img src={tab.img} alt={tab.label} className="sidebar-img" />
              {activeTab === tab.id && (
                <span className="icon-label">{tab.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
