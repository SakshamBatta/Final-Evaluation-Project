import logo from "../../assets/logo.png";
import front2 from "../../assets/front2.png";
import "./SignUp.css";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const checkboxRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName) {
      toast.warn("Please enter your first name");
      return;
    }
    if (!formData.lastName) {
      toast.warn("Please enter your last name");
      return;
    }
    if (!formData.email) {
      toast.warn("Please enter your email");
      return;
    }
    if (!formData.password) {
      toast.warn("Please enter your password");
      return;
    }
    if (!confirmPassword) {
      toast.warn("Please confirm your password");
      return;
    }
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!checkboxRef.current.checked) {
      toast.warn("Please accept the terms and conditions");
      return;
    }

    const response = await axios.post(
      `http://localhost:3000/api/auth/register`,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }
    );

    if (response.status === 201) {
      toast.success("Account created successfully");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
    checkboxRef.current.checked = false;
  };

  return (
    <div className="container-signup">
      <img
        className="main-logo-signup"
        src={logo}
        alt=""
        onClick={() => navigate("/home")}
      />
      <div className="inner-left-container-signup">
        <div className="left-panel-signup">
          <div className="sub-heading-signup">
            <h3>Create an account</h3>
            <Link to="/signin">Sign in instead</Link>
          </div>
          <div className="form-div-signup">
            <form className="form-signup" onSubmit={handleSubmit}>
              <label htmlFor="">First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <label htmlFor="">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
              <label htmlFor="">Confirm Password</label>
              <input
                type="text"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="terms-check-signup">
                <input type="checkbox" ref={checkboxRef} />
                <p>
                  By creating an account, I agree to our <u>Terms of use</u>{" "}
                  <br /> and <u>Privacy Policy</u>
                </p>
              </div>
              <button className="btn-signup">Create an account</button>
            </form>
          </div>
          <p className="footer-signup">
            This site is protected by reCAPTCHA and the{" "}
            <u>Google Privacy Policy</u> and <u>Terms of Service</u> apply
          </p>
        </div>
      </div>
      <img src={front2} alt="" />
    </div>
  );
}
