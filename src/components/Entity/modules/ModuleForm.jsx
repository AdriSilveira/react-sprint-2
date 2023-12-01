import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Action from "../../UI/Actions.jsx";
import apiURL from "../../apis/apiURL.jsx";
import FormItem from "../../UI/Form.jsx";
import API from "../../apis/API.jsx";

const emptyModule = {
  ModuleName: "New Module",
  ModuleCode: "XY0001",
  ModuleLevel: 3,
  ModuleYearID: null,
  ModuleLeaderID: null,
  ModuleImageURL:
    "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
};

export default function ModuleForm({
  onCancel,
  onSubmit,
  initialModule = emptyModule,
}) {
  // Initialisation ------------------------------
  const validation = {
    isValid: {
      ModuleName: (name) => name.length > 8,
      ModuleCode: (code) => /^\D{2}\d{4}$/.test(code),
      ModuleLevel: (level) => level > 2 && level < 8,
      ModuleYearID: (id) => id !== 0,
      ModuleLeaderID: (id) => true,
      ModuleImageURL: (url) =>
        /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(
          url
        ),
    },
    errorMessage: {
      ModuleName: "Module name is too short",
      ModuleCode: "Module code is not in a valid format",
      ModuleLevel: "Invalid module level",
      ModuleYearID: "No delivery year has been selected",
      ModuleLeaderID: "No module leader has been selected",
      ModuleImageURL: "Image URL is not a valid URL string",
    },
  };
  console.log("whattttt");
  //   const conformance = ['ModuleLevel','ModuleYearID','ModuleLeaderID'];
  //   // console.log(errorMessage);
  //   // const conformance = {
  //   //   html2js: {
  //   //     ModuleName: (value) => (value === "" ? null : value),
  //   //     ModuleCode: (value) => (value === "" ? null : value),
  //   //     ModuleLevel: (value) => parseInt(value),
  //   //     ModuleYearID: (value) => (value == 0 ? null : parseInt(value)),
  //   //     ModuleLeaderID: (value) => (value == 0 ? null : parseInt(value)),
  //   //     ModuleImageURL: (value) => (value === "" ? null : value),
  //   //   },
  //   //   js2html: {
  //   //     ModuleName: (value) => (value === null ? "" : value),
  //   //     ModuleCode: (value) => (value === null ? "" : value),
  //   //     ModuleLevel: (value) => value,
  //   //     ModuleYearID: (value) => (value === null ? 0 : value),
  //   //     ModuleLeaderID: (value) => (value === null ? 0 : value),
  //   //     ModuleImageURL: (value) => (value === null ? "" : value),
  //   //   },
  //   // };
  // const apiURL = "http://softwarehub.uk/unibase/api";
  const yearsEndpoint = `${apiURL}/years`;
  const staffEndpoint = `${apiURL}/users/staff`;
  const postModuleEndpoint = `${apiURL}/modules`;
  console.log("Hereeee");
  // State ---------------------------------------
  //maybe modules??????
  const [module, setModule] = useState(initialModule);
  const [years, setYears] = useState(null);
  const [loadingYearsMessage, setloadingYearsMessage] =
    useState("Loading records");

  const getYears = async () => {
    const response = await API.get("/years");
    response.isSuccess
      ? setYears(response.result)
      : setloadingYearsMessage(response.message);
  };
  useEffect(() => {
    getYears();
  }, []);

  const [staff, setStaff] = useState(null);
  const [errors, setErrors] = useState(
    Object.keys(initialModule).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );
  console.log("Aonde???");
  const apiGet = async (endpoint, setState) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setState(result);
  };

  const apiPost = async (endpoint, record) => {
    // Build request object
    const request = {
      method: "POST",
      body: JSON.stringify(record),
      headers: { "Content-type": "application/json" },
    };

    // Call the Fetch
    const response = await fetch(endpoint, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };
  console.log("aqui");
  useEffect(() => {
    apiGet(yearsEndpoint, setYears);
  }, [yearsEndpoint]);

  useEffect(() => {
    apiGet(staffEndpoint, setStaff);
  }, [staffEndpoint]);
  console.log("I am lost");
  // Handlers ------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newvalue =
      name === "ModuleLevel" ||
      name === "ModuleYearID" ||
      name === "ModuleLeaderID"
        ? parseInt(value)
        : value;
    setModule({ ...module, [name]: newvalue });
    setErrors({
      ...errors,
      [name]: isValid[name](newvalue) ? null : errorMessage[name],
    });
  };

  const handleSubmit = async () => {
    // console.log(`Module=[${JSON.stringify(module)}]`);
    const result = await apiPost(postModuleEndpoint, module);
    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };

  // View ----------------------------------------
  return (
    <form className="BorderedForm">
      <FormItem
        label="Module Name"
        htmlFor="ModuleName"
        advice="Please enter the name
        of the module"
        error={errors.ModuleName}
      >
        <input
          type="text"
          name="ModuleName"
          value={module.ModuleName}
          onChange={handleChange}
        />
      </FormItem>
      <FormItem
        label="Module Code"
        htmlFor="ModuleCode"
        advice="Please enter the module code"
        error={errors.ModuleCode}
      >
        <input
          type="text"
          name="ModuleCode"
          value={module.ModuleCode}
          onChange={handleChange}
        />
      </FormItem>
      <FormItem
        label="Module Level"
        htmlFor="ModuleLevel"
        advice="Choose a level between 3 and 7"
        error={errors.ModuleLevel}
      >
        console.log("What");
        <select
          name="ModuleLevel"
          value={module.ModuleLevel}
          onChange={handleChange}
        >
          <option value="0" disabled>
            Select module level
          </option>
          {[3, 4, 5, 6, 7].map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </FormItem>

      <FormItem
        label="Module year"
        htmlFor="ModuleYearID"
        advice="Select year of delivery"
        error={errors.ModuleYearID}
      >
        {!years ? (
          <p>{loadingYearsMessage}</p>
        ) : years.length === 0 ? (
          <p>No years found</p>
        ) : (
          <select
            name="ModuleYearID"
            value={module.ModuleYearID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              None selected
            </option>
            {years.map((year) => (
              <option key={year.YearID} value={year.YearID}>
                {year.YearName}
              </option>
            ))}
          </select>
        )}
      </FormItem>

      <div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
