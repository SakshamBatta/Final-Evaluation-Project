import "./Dashboard.css";
import search from "../../assets/search.png";
import sms from "../../assets/sms.png";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import axios from "axios";

export default function Dashboard() {
  const [activeMidTab, setActiveMidTab] = useState("All Tickets");
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/ticket/get/tickets`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTickets(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getChats();
  }, []);

  function getTimeAgo(dateString) {
    const now = new Date();
    const created = new Date(dateString);
    const diff = Math.floor((now - created) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  const filteredTickets = tickets
    .filter((ticket) => {
      if (activeMidTab === "Resolved") return ticket.status === "Resolved";
      if (activeMidTab === "Unresolved") return ticket.status === "Unresolved";
      return true;
    })
    .filter((ticket) => {
      const lowerSearch = searchTerm.toLowerCase();
      const ticketTitle = ticket.title?.toLowerCase() || "";
      const username = ticket.userDetails?.name?.toLowerCase() || "";
      return (
        ticketTitle.includes(lowerSearch) || username.includes(lowerSearch)
      );
    });

  const midTabs = ["All Tickets", "Resolved", "Unresolved"];

  return (
    <div className="container-dashboard">
      <div className="inner-container-dashboard">
        <SideBar />
        <div className="right-inner-dashboard">
          <h3 className="heading-dashboard">Dashboard</h3>
          <div className="search-panel-dashboard">
            <img src={search} alt="" />
            <input
              type="text"
              placeholder="Search for ticket"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <div key={ticket.id} className="ticket-tab">
                    <div className="ticket-upper-tab">
                      <div className="ticket-heading-grp">
                        <div className="ticket-dot"></div>
                        <div className="ticket-name">{ticket.title}</div>
                      </div>
                      <div className="ticket-time">{ticket.date}</div>
                    </div>
                    <div className="ticket-lower-tab">
                      <div className="ticket-message">{ticket.lastMsg}</div>
                      <div className="time-ago">{getTimeAgo(ticket.date)}</div>
                    </div>
                    <div className="ticket-divider"></div>
                    <div className="ticker-user-details">
                      <div className="user-details-ticket">
                        <div className="user-photo">
                          <img className="pic" src={user} alt="" />
                        </div>
                        <div className="user">
                          <h3>{ticket.userDetails.name}</h3>
                          <p>{ticket.userDetails.phone}</p>
                          <p>{ticket.userDetails.email}</p>
                        </div>
                        <div>
                          <Link
                            to="/contact"
                            state={{ ticketId: ticket.id }}
                            className="ticket-link"
                          >
                            Open Ticket
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center" }}>No ticket found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
