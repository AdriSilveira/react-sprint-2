import "./Header.scss";
function Header(props) {
  //Properties--------------------------------------------
  //Hooks-------------------------------------------------
  //Context-----------------------------------------------
  //Methods-----------------------------------------------
  //View--------------------------------------------------

  return (
    <header>
      <div className="layout">
        <h1> Contribution Log </h1>
        <p className="welcome">Welcome! {props.loggedInUser}</p>
      </div>
    </header>
  );
}
export default Header;
