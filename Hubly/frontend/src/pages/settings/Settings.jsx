import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./Settings.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import info from "../../assets/info.png";

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/user/get-profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { firstName, lastName, email } = res.data.user;
      setProfile((prev) => ({ ...prev, firstName, lastName, email }));
    };
    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profile.password !== profile.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/user/update-profile`,
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          password: profile.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
      if (res.data.logout) {
        localStorage.removeItem("token");
        <Navigate to="/signin" />;
      }
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <>
      <div className="container-dashboard">
        <div className="inner-container-dashboard">
          <SideBar />
          <div className="right-inner-dashboard">
            <h3 className="heading-dashboard">Settings</h3>
            <div className="profile-div">
              <div className="heading-profile">
                <p>Edit Profile</p>
                <div className="blue-line-settings"></div>
                <div className="full-line-settings"></div>
              </div>
              <form className="settings-form">
                <label>First name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                />
                <label>Last name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                />
                <div className="input-with-tooltip">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                  <div className="tooltip-container">
                    <img src={info} className="info-icon" alt="info" />
                    <div className="tooltip-text">
                      User will be logged out immediately
                    </div>
                  </div>
                </div>

                <div className="input-with-tooltip">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setProfile({ ...profile, password: e.target.value })
                    }
                  />
                  <div className="tooltip-container">
                    <img src={info} className="info-icon" alt="info" />
                    <div className="tooltip-text">
                      User will be logged out immediately
                    </div>
                  </div>
                </div>

                <div className="input-with-tooltip">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <div className="tooltip-container">
                    <img src={info} className="info-icon" alt="info" />
                    <div className="tooltip-text">
                      User will be logged out immediately
                    </div>
                  </div>
                </div>

                <button className="settings-form-btn" onClick={handleSubmit}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
