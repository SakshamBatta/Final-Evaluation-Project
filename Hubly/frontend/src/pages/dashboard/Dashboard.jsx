import "./Dashboard.css";
import dashLogo from "../../assets/dashLogo.png";
import contact from "../../assets/contact.png";
import analytics from "../../assets/analytics.png";
import chatBot from "../../assets/chatBot.png";
import team from "../../assets/team.png";
import homeSymbol from "../../assets/homeSymbol.png";
import settings from "../../assets/settings.png";
import search from "../../assets/search.png";
import sms from "../../assets/sms.png";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [activeMidTab, setActiveMidTab] = useState("All Tickets");

  const tabs = [
    { id: "Dashboard", img: homeSymbol, label: "Dashboard" },
    { id: "Contact Center", img: contact, label: "Contact Center" },
    { id: "Analytics", img: analytics, label: "Analytics" },
    { id: "Chat bot", img: chatBot, label: "Chat bot" },
    { id: "Team", img: team, label: "Team" },
    { id: "Setting", img: settings, label: "Setting" },
  ];

  const tickets = [
    {
      id: 1,
      ticket_name: "Ticket# 2023-00123",
      created_at: "Posted at 12:45 AM",
      time_ago: "10:00",
      message: "Hey!",
      username: "John Snow",
      phone: "+91 0000000000",
      email: "example@gmail.com",
      label: "Open Ticket",
    },
    {
      id: 2,
      ticket_name: "Ticket# 2023-00123",
      created_at: "Posted at 12:45 AM",
      time_ago: "10:00",
      message: "Hey!",
      username: "John Snow",
      phone: "+91 0000000000",
      email: "example@gmail.com",
      label: "Open Ticket",
    },
    {
      id: 3,
      ticket_name: "Ticket# 2023-00123",
      created_at: "Posted at 12:45 AM",
      time_ago: "10:00",
      message: "Hey!",
      username: "John Snow",
      phone: "+91 0000000000",
      email: "example@gmail.com",
      label: "Open Ticket",
    },
  ];

  const midTabs = ["All Tickets", "Resolved", "Unresolved"];

  return (
    <div className="container-dashboard">
      <div className="inner-container-dashboard">
        <div className="left-inner-dashboard">
          <img src={dashLogo} alt="" className="dashboard-logo" />

          <div className="sidebar">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`sidebar-icon ${
                  activeTab === tab.id ? "active" : ""
                } `}
                onClick={() => setActiveTab(tab.id)}
              >
                <img src={tab.img} alt={tab.label} className="sidebar-img" />
                {activeTab === tab.id && (
                  <span className="icon-label">{tab.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="right-inner-dashboard">
          <h3 className="heading-dashboard">Dashboard</h3>
          <div className="search-panel-dashboard">
            <img src={search} alt="" />
            <h4>Search for ticket</h4>
          </div>
          <div className="mid-level-tabs">
            {midTabs.map((tab) => (
              <div
                key={tab}
                className={`mid-tab ${activeMidTab === tab ? "active" : ""}`}
                onClick={() => setActiveMidTab(tab)}
              >
                <div className="mid-tab-content">
                  {tab === "All Tickets" && <img src={sms} alt="" />}
                  <h3>{tab}</h3>
                </div>
                <div className="tab-underline" />
              </div>
            ))}
          </div>
          <div className="ticket-section">
            <div className="inner-ticket-section">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-tab">
                  <div className="ticket-upper-tab">
                    <div className="ticket-heading-grp">
                      <div className="ticket-dot"></div>
                      <div className="ticket-name">{ticket.ticket_name}</div>
                    </div>
                    <div className="ticket-time">{ticket.created_at}</div>
                  </div>
                  <div className="ticket-lower-tab">
                    <div className="ticket-message">{ticket.message}</div>
                    <div className="time-ago">{ticket.time_ago}</div>
                  </div>
                  <div className="ticket-divider"></div>
                  <div className="ticker-user-details">
                    <div className="user-details">
                      <div className="user-photo">
                        <img className="pic" src={user} alt="" />
                      </div>
                      <div className="user">
                        <h3>{ticket.username}</h3>
                        <p>{ticket.phone}</p>
                        <p>{ticket.email}</p>
                      </div>
                      <div>
                        <Link className="ticket-link">Open Ticket</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
