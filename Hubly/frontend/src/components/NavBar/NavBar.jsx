import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="nav">
        <img src={logo} alt="" onClick={() => navigate("/home")} />
        <div className="both-btns">
          <button onClick={() => navigate("/signin")} className="btn-color1">
            Login
          </button>
          <button onClick={() => navigate("/signup")} className="btn-color2">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
