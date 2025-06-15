import SideBar from "../../components/SideBar/SideBar";
import "./Team.css";
import upDown from "../../assets/upDown.png";
import profilePic from "../../assets/profilePic.png";
import edit from "../../assets/edit.png";
import deletePic from "../../assets/deletePic.png";
import circlePlus from "../../assets/circlePlus.png";
import { useEffect, useState } from "react";
import { AddTeamModal } from "../../components/AddTeamModal/AddTeamModal";
import axios from "axios";

export default function Team() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [deleteMemberEmail, setDeleteMemberEmail] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          `https://hubly-7rev.onrender.com/api/admin/get-team`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMembers(res.data.team);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeam();
  }, []);

  const deleteMember = async () => {
    await axios.delete(`https://hubly-7rev.onrender.com/api/admin/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: {
        email: deleteMemberEmail,
      },
    });

    setDeleteMemberEmail(null);
  };

  return (
    <>
      <div className="container-dashboard">
        <div className="inner-container-dashboard">
          <SideBar />
          <div className="right-inner-dashboard">
            <h3 className="heading-dashboard">Team</h3>
            <div className="group-div-team">
              <div className="line1-team"></div>
              <div className="title-team-div">
                <div className="name-icon-team">
                  <h3 className="titles1-team">Full Name</h3>
                  <img src={upDown} alt="" />
                </div>
                <h3 className="titles2-team">Phone</h3>
                <h3 className="titles3-team">Email</h3>
                <h3 className="titles4-team">Role</h3>
              </div>
              <div className="line2-team"></div>
              <div className="teammates">
                {members.map((member) => (
                  <div key={member.id} className="member-group-team">
                    <img src={profilePic} alt="" />
                    <div className="col-name">{member.name}</div>
                    <div className="col-phone">{member.phone || "-"}</div>
                    <div className="col-email">{member.email}</div>
                    <div className="col-role">
                      {member.role === "admin" ? "Admin" : "Member"}
                    </div>
                    {member.role !== "admin" && (
                      <div className="edit-delete-team">
                        <img src={edit} alt="" />{" "}
                        <img
                          src={deletePic}
                          alt=""
                          onClick={() => {
                            setDeleteMemberEmail(member.email);
                          }}
                        />
                        {deleteMemberEmail === member.email && (
                          <div className="delete-modal">
                            <p>This Teammate will be deleted</p>
                            <div className="btns">
                              <button
                                className="btn1"
                                onClick={() => {
                                  setDeleteMemberEmail(null);
                                }}
                              >
                                Cancel
                              </button>
                              <button className="btn2" onClick={deleteMember}>
                                Confirm
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  className="add-team"
                  onClick={() => setOpenAddModal(true)}
                >
                  <img src={circlePlus} alt="add" />
                  Add Team members
                </button>
              </div>
              {openAddModal && (
                <AddTeamModal setOpenAddModal={setOpenAddModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
