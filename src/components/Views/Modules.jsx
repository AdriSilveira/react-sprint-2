import React from "react";
import { useState, useEffect } from "react";
import API from "../apis/API.jsx";
import "../../App.scss";
import { Card, CardContainer } from "../UI/Card.jsx";
import ModuleForm from "../Entity/modules/ModuleForm.jsx";

function Modules() {
  //Initialisation--------------------------------------------------
  // const endpoint = `/modules/users/${loggedinUser.UserID}`;
  const modulesEndpoint = "/modules";

  //State-----------------------------------------------------------
  const [modules, setModules] = useState(null);
  const [loadingMessage, setloadingMessage] = useState("Loading Records...");
  const [showNewModuleForm, setshowNewModuleForm] = useState(false);
  const [showJoinModuleForm, setShowJoinModuleForm] = useState(false);

  //Context---------------------------------------------------------
  //Methods---------------------------------------------------------

  const getModules = async () => {
    const response = await API.get(`/modules`);
    response.isSuccess
      ? setModules(response.result)
      : setloadingMessage(response.message);
  };
  console.log("Show me");
  useEffect(() => {
    getModules();
  }, []);
  const handleSubmit = async (module) => {
    const response = await API.post(endpoint, module);
    return response.isSuccess ? getModules() || true : false;
  };
  const handleJoin = () => {
    setShowJoinModuleForm(true);
  };
  const handleAdd = () => {
    setshowNewModuleForm(true);
  };
  const handleDismissAdd = () => {
    setshowNewModuleForm(false);
  };
  const handleDismissJoin = () => {
    setshowJoinModuleForm(false);
  };
  //View------------------------------------------------------------

  return (
    <section>
      <h1>My Modules</h1>
      {/* <RenderCount background="Yellow" fontColor="Black" /> */}
      {!modules ? (
        <p>{loadingMessage}</p>
      ) : modules.length === 0 ? (
        <p>No modules Found</p>
      ) : (
        <CardContainer>
          {modules.map((module) => {
            return (
              <div className="modulecard" key={module.ModuleCode}>
                <Card>
                  <img src={module.ModuleImageURL} alt={module.ModuleName} />
                  <p>{module.ModuleCode}</p>
                  <p>{module.ModuleName}</p>
                </Card>
              </div>
            );
          })}
        </CardContainer>
      )}
      <CardContainer>
        <div>
          <button type="button" onClick={() => setshowNewModuleForm(true)}>
            Add Module
          </button>
          <button type="button" onClick={() => setShowJoinModuleForm(true)}>
            Join Module
          </button>
        </div>
      </CardContainer>
      {showNewModuleForm && (
        <ModuleForm onDismiss={handleDismissAdd} onSubmit={handleAdd} />
      )}
      {showJoinModuleForm && <p>{"<JoinModuleForm/>"}</p>}

      <div className="font">
        <div className="PTSerifCaption-Regular"></div>
        <div className="PlayfairDisplay-VariableFont_wght"></div>{" "}
      </div>
    </section>
  );
}
export default Modules;
