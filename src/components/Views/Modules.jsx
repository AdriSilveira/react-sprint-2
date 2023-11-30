import React from "react";
import { useState, useEffect } from "react";
import API from "../apis/API.jsx";
import "../../App.scss";
import { Card, CardContainer } from "../UI/Card.jsx";
import ModuleForm from "../Entity/modules/ModuleForm.jsx";

function Modules() {
  //Initialisation--------------------------------------------------
  const loggedinUserID = 279;
  const endpoint = `/modules`;

  //State-----------------------------------------------------------
  const [modules, setModules] = useState(null);
  const [loadingMessage, setloadingMessage] = useState("Loading Records...");
  const [showNewModuleForm, setshowNewModuleForm] = useState(false);
  const [showJoinModuleForm, setShowJoinModuleForm] = useState(false);

  //Context---------------------------------------------------------
  //Methods---------------------------------------------------------

  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setModules(response.result)
      : setloadingMessage(response.message);
  };
  console.log("Show me");
  useEffect(() => {
    console.log("here");
    apiCall(endpoint);
  }, [endpoint]);

  const handleJoin = () => {
    setShowJoinModuleForm(false);
  };
  const handleSuccess = () => {
    setshowNewModuleForm(false);
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
        <ModuleForm
          onCancel={() => setshowNewModuleForm(false)}
          onSubmit={handleSuccess}
        />
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
