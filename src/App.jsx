import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
// import Home from "./components/Views/Modules.jsx";
import SignIn from "./components/Views/SignIn.jsx";
import ContactUs from "./components/Views/ContactUs.jsx";
import PageNotFound from "./components/Views/PageNotFound.jsx";
import "./App.scss";
import Modules from "./components/Views/Modules.jsx";
import ModuleForm from "./components/Entity/modules/ModuleForm.jsx";

function App() {
  const loggedInUser = "Adriana";

  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>
          <Route path="/" element={<Modules />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/pageNotFound" element={<PageNotFound />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/ModuleForm" element={<ModuleForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
