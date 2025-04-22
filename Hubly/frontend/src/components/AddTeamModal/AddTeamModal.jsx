import { useState } from "react";
import "./AddTeamModal.css";
import axios from "axios";

export function AddTeamModal({ setOpenAddModal }) {
  const [role, setRole] = useState("member");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/invite-member",
        {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Team member added:", res.data);
      setOpenAddModal(false);
    } catch (error) {
      console.error(
        "Error adding member:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div className="container-add-modal">
        <div className="modal-box">
          <h3>Add Team members</h3>
          <p className="sub-heading-modal">
            Talk with colleagues in a group chat. Messages in this group are
            only visible to it's participants. New teammates may only be invited
            by the administrators.
          </p>
          <form className="modal-form">
            <label>User name</label>
            <input
              type="text"
              placeholder="User name"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <label>Email ID</label>
            <input
              type="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <label>Designation</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
            <div className="form-btns">
              <button className="btn1" onClick={() => setOpenAddModal(false)}>
                Cancel
              </button>
              <button className="btn2" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
