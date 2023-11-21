import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  //Properties--------------------------------------------
  //Hooks-------------------------------------------------
  //Context-----------------------------------------------
  //Methods-----------------------------------------------
  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);
  //View--------------------------------------------------

  return (
    <nav>
      <div className="navItem">
        <NavLink to="/">Modules</NavLink>
      </div>

      <div className="navItem">
        <NavLink to="/groups" className={getLinkStyle}>
          Groups
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/singin" className={getLinkStyle}>
          Sign In
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/contact" className={getLinkStyle}>
          Contact us
        </NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
