import SideBar from "../../components/SideBar/SideBar";
import homeSymbol from "../../assets/homeSymbol.png";
import "./ContactCenter.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/user.png";
import { useEffect, useState } from "react";
import name from "../../assets/name.png";
import msg from "../../assets/msg.png";
import phone from "../../assets/phone.png";
import arrowDown from "../../assets/arrowDown.png";
import React from "react";
import ticketImg from "../../assets/ticketStatus.png";
import adminSend from "../../assets/adminSend.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function ContactCenter() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [confirmAssignMember, setConfirmAssignMember] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ticketStatusIsOpen, setTicketStatusIsOpen] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [resolvedConfirmation, setResolvedConfirmation] = useState(false);
  const [assignConfirmation, setAssignConfirmation] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [missedTicketIds, setMissedTicketIds] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
    }
  }, []);

  console.log(currentUser);

  useEffect(() => {
    if (location.state?.ticketId && chats.length > 0) {
      const matchedChat = chats.find(
        (chat) => chat.id === location.state.ticketId
      );

      if (matchedChat) {
        setSelectedChat(matchedChat);
      } else {
        setSelectedChat(chats[0]);
      }
    } else if (chats.length > 0) {
      setSelectedChat(chats[0]);
    }
  }, [chats, location.state]);

  console.log(confirmAssignMember);

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await axios.get(
          `https://hubly-0zgf.onrender.com/api/ticket/get/tickets`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setChats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getChats();
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          `https://hubly-0zgf.onrender.com/api/admin/get-team`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTeamMembers(res.data.team);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeam();
  }, []);

  const sendAdminMessage = async () => {
    await axios.post(
      `https://hubly-0zgf.onrender.com/api/ticket/${selectedChat.id}/reply`,
      {
        sender: "admin",
        text: adminMessage,
      }
    );

    setAdminMessage("");
  };

  const resolveTicket = async () => {
    await axios.put(
      `https://hubly-0zgf.onrender.com/api/ticket/${selectedChat.id}/resolve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setResolvedConfirmation(false);
    setTicketStatusIsOpen(false);
    setSelectedChat((prev) => ({
      ...prev,
      status: "Resolved",
    }));
  };

  const assignMember = async () => {
    await axios.put(
      `https://hubly-0zgf.onrender.com/api/ticket/assign`,
      {
        ticketId: selectedChat.id,
        memberId: confirmAssignMember.user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setSelectedChat((prev) => ({
      ...prev,
      assigned_to: confirmAssignMember.user_id,
    }));
    setSelectedTeam(confirmAssignMember);
    setAssignConfirmation(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://hubly-0zgf.onrender.com/api/analytics/missed-chats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMissedTicketIds(res.data.missedTicketIds);
    };
    fetchData();
  }, []);

  console.log(selectedChat);
  console.log(missedTicketIds);

  return (
    <>
      <div className="container-dashboard">
        <div className="inner-container-dashboard">
          <SideBar />
          <div className="right-inner-dashboard-contact">
            <div className="all-contact-section">
              <h3 className="heading-dashboard">Contact Center</h3>
              <h4>Chats</h4>
              <div className="line1"></div>
              <div className="line2"></div>

              <div className="all-chats">
                {chats.map((chat) => (
                  <div
                    className={`indi-chat ${
                      selectedChat?.id === chat.id ? "active-chat" : ""
                    }`}
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <img src={user} className="chat-pic" />
                    <div className="indi-chat-details">
                      <h5>{chat.name}</h5>
                      <p>{chat.lastMsg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-chat-section">
              <div className="chat-div-upper">
                {selectedChat ? selectedChat.title : ""}
                <img
                  className="home-symbol"
                  src={homeSymbol}
                  alt=""
                  onClick={() => navigate("/dashboard")}
                />
              </div>
              <div className="chat-div-lower">
                <div className="chat-date-div">
                  <div className="date-line1"></div>
                  <p>{selectedChat?.date}</p>
                  <div className="date-line2"></div>
                </div>
                <div className="chat-container">
                  <div className="chat-msg-div">
                    {selectedChat?.messages?.map((msg, index) => {
                      const prev = selectedChat.messages[index - 1];
                      const isSameSender = prev?.from === msg.from;
                      const isAdmin = msg.from === "admin";
                      const senderName = isAdmin
                        ? "Admin"
                        : selectedChat.userDetails.name;

                      return (
                        <div
                          key={index}
                          className={`chat-msg-container ${
                            isAdmin ? "right" : "left"
                          }`}
                        >
                          {!isSameSender && (
                            <div className="sender-info">
                              <img src={user} className="msg-dp" alt="dp" />
                              <div className="msg-name">{senderName}</div>
                            </div>
                          )}
                          {index === 0 &&
                            missedTicketIds?.includes(
                              String(selectedChat.id)
                            ) && (
                              <p className="missed-chat-label">
                                Replying to missed chat
                              </p>
                            )}
                          <div className="msg-bubble">{msg.text}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedChat?.status === "Resolved" ? (
                  <p className="resolved-msg">This chat has been resolved</p>
                ) : selectedChat?.assigned_to !== currentUser?.id ? (
                  <p className="assign-msg">
                    This chat is assigned to new team member. You no longer have
                    access.
                  </p>
                ) : (
                  <div className="chat-msg-wrapper">
                    <textarea
                      className="chat-input-div"
                      type="text"
                      value={adminMessage}
                      onChange={(e) => setAdminMessage(e.target.value)}
                      placeholder="Type here"
                    >
                      {" "}
                    </textarea>
                    <img
                      className="admin-send-btn"
                      src={adminSend}
                      alt=""
                      onClick={sendAdminMessage}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="contact-details-section">
              <div className="contact-details-container">
                <div className="user-details-header">
                  <img src={user} alt="" />
                  <p>Chat</p>
                </div>
                <div className="user-details">
                  <p className="details-heading">Details</p>
                  <div className="final-details">
                    <div className="user-chat">
                      <img src={name} alt="" />
                      <p>{selectedChat?.userDetails.name}</p>
                    </div>
                    <div className="user-chat">
                      <img src={phone} alt="" />
                      <p>{selectedChat?.userDetails.phone}</p>
                    </div>
                    <div className="user-chat">
                      <img src={msg} alt="" />
                      <p>{selectedChat?.userDetails.email}</p>
                    </div>
                  </div>
                </div>
                <div className="team-details">
                  <p className="team-details-heading">Teammates</p>
                  <div className="team-dropdown">
                    <div
                      className={`selected-option-team ${
                        currentUser?.role === "team_member"
                          ? "disabled-dropdown"
                          : ""
                      }`}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <img className="team-member-img" src={user} alt="" />
                      <span>
                        {(currentUser?.id === selectedChat?.assigned_to
                          ? currentUser?.name
                          : teamMembers.find(
                              (member) =>
                                member.user_id === selectedChat?.assigned_to
                            )?.name) ||
                          selectedTeam?.name ||
                          "Select Member"}
                      </span>
                      <img className="dropdown-img" src={arrowDown} alt="" />
                    </div>
                    {isOpen && (
                      <div className="team-options-list">
                        {teamMembers.map((member, index) => (
                          <React.Fragment key={index}>
                            <div
                              className="team-option-item"
                              onClick={() => {
                                setConfirmAssignMember(member);
                                setAssignConfirmation(true);
                              }}
                            >
                              <img
                                src={user}
                                alt=""
                                className="team-member-img"
                              />
                              <span>{member.name}</span>
                            </div>

                            {index !== teamMembers.length - 1 && (
                              <div className="separator-wrapper">
                                <div className="team-member-seperator"></div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                  {assignConfirmation && (
                    <div className="assign-confirmation">
                      <p>Chat would be assigned to Different team member</p>
                      <div className="btns">
                        <button
                          className="btn1"
                          onClick={() => {
                            setAssignConfirmation(false);
                            setIsOpen(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button className="btn2" onClick={assignMember}>
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="ticket-status-details">
                  <div
                    className="default-ticket-status"
                    onClick={() => setTicketStatusIsOpen(!ticketStatusIsOpen)}
                  >
                    <img
                      className="ticket-status-image"
                      src={ticketImg}
                      alt=""
                    />
                    <span>{selectedChat?.status}</span>
                    <img
                      className="ticket-dropdown-img"
                      src={arrowDown}
                      alt=""
                    />
                  </div>
                  {ticketStatusIsOpen && (
                    <div className="ticket-options-list">
                      <p
                        onClick={() => {
                          setResolvedConfirmation(true);
                        }}
                      >
                        Resolved
                      </p>
                      <div className="ticket-status-seperator"></div>
                      <p
                        onClick={() => {
                          setSelectedChat((prev) => ({
                            ...prev,
                            status: "Unresolved",
                          }));
                          setTicketStatusIsOpen(false);
                        }}
                      >
                        Unresolved
                      </p>
                    </div>
                  )}
                  {resolvedConfirmation && (
                    <div className="resolved-confirmation">
                      <p>Chat will be closed</p>
                      <div className="btns">
                        <button
                          className="btn1"
                          onClick={() => {
                            setResolvedConfirmation(false);
                            setTicketStatusIsOpen(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button className="btn2" onClick={resolveTicket}>
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
