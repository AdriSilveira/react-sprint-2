import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import "./Layout.scss";

function Layout({ children }) {
  //Properties----------------------------------------------
  //Hooks---------------------------------------------------
  //Context-------------------------------------------------
  //Methods-------------------------------------------------
  //View----------------------------------------------------

  return (
    <div className="centrepane">
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
export default Layout;
