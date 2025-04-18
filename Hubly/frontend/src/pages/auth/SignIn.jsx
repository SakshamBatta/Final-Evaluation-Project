import logo from "../../assets/logo.png";
import front2 from "../../assets/front2.png";
import "./SignIn.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName) {
      toast.warn("Please enter your username");
      return;
    }

    if (!formData.password) {
      toast.warn("Please enter your password");
      return;
    }

    const response = await axios.post(`http://localhost:3000/api/auth/login`, {
      email: formData.userName,
      password: formData.password,
    });

    if (response.status === 200) {
      toast.success("Logged In Successfully");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }

    setFormData({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <img
        className="main-logo"
        src={logo}
        alt=""
        onClick={() => navigate("/home")}
      />
      <div className="inner-left-container">
        <div className="left-panel">
          <div className="sub-heading">
            <h3>Sign in to your Plexify</h3>
          </div>
          <div className="form-div">
            <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />

              <label htmlFor="">Password</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <button className="btn">Log in</button>
            </form>
          </div>
          <div className="lower-footer">
            <a className="forgot" href="#">
              Forgot password?
            </a>
            <span>
              Don't have an account?{" "}
              <Link className="sign-up" to="/signup">
                Sign up
              </Link>
            </span>
          </div>
          <p className="footer">
            This site is protected by reCAPTCHA and the{" "}
            <u>Google Privacy Policy</u> and <u>Terms of Service</u> apply
          </p>
        </div>
      </div>
      <img src={front2} alt="" />
    </div>
  );
}
