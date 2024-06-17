import { Link } from "react-router-dom";
import LoginInfo from "./LoginInfo";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <LoginInfo />
    </div>
  );
};

export default NavBar;
