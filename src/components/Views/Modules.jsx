import React from "react";
import { useState, useEffect } from "react";
import API from "../apis/API.jsx";
import "../../App.scss";
import { Card, CardContainer } from "../UI/Card.jsx";
import ModuleForm from "../Entity/modules/ModuleForm.jsx";
import JoinModuleForm from "../Entity/JoinModuleForm.jsx";
import useLoad from "../apis/useLoad.jsx";

function Modules() {
  //Initialisation--------------------------------------------------
  //const { loggedinUser } = useAuth();
  //const loggedinUser = {userID:1}

  //const getModulesEndpoint = `/modules/users/${loggedinUser.UserID}`;
  const getModulesEndpoint = "/modules/users/279";
  const postModulesEndpoint = "/modules";
  const postModulemembersendpoint = "/modulemembers";

  //State-----------------------------------------------------------
  const [modules, , loadingMessage, loadModules] = useLoad(getModulesEndpoint);

  const [showAddModuleForm, setShowAddModuleForm] = useState(false);
  const [showJoinModuleForm, setShowJoinModuleForm] = useState(false);
  //Context---------------------------------------------------------
  //Methods-----------------------------------------------------------
  const toggleAddForm = () => setShowAddModuleForm(!showAddModuleForm);
  const toggleJoinForm = () => setShowJoinModuleForm(!showJoinModuleForm);
  const cancelAddForm = () => setShowAddModuleForm(false);
  const cancelJoinForm = () => setShowJoinModuleForm(false);

  const handleAddSubmit = async (module) => {
    const response = await API.post(postModulesEndpoint, module);
    return response.isSuccess;
  };

  const handleJoinSubmit = async (modulemember) => {
    const response = await API.post(postModulemembersendpoint, modulemember);
    return response.isSuccess ? loadModules(getModulesEndpoint) || true : false;
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
          <button type="button" onClick={toggleAddForm}>
            Add New Module
          </button>
        </div>
        <div>
          <button type="button" onClick={toggleJoinForm}>
            Join Module
          </button>
        </div>
        {showAddModuleForm && (
          <ModuleForm onCancel={cancelAddForm} onSubmit={handleAddSubmit} />
        )}
        {showJoinModuleForm && (
          <JoinModuleForm
            onCancel={cancelJoinForm}
            onSubmit={handleJoinSubmit}
          />
        )}

        <div className="font">
          <div className="PTSerifCaption-Regular"></div>
          <div className="PlayfairDisplay-VariableFont_wght"></div>{" "}
        </div>
      </CardContainer>
    </section>
  );
}
export default Modules;
