import logo from "../../assets/logo.png";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div>
      <div className="nav">
        <img src={logo} alt="" />
        <div className="both-btns">
          <button className="btn-color1">Login</button>
          <button className="btn-color2">Sign up</button>
        </div>
      </div>
    </div>
  );
}
