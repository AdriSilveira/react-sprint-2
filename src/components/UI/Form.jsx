import "./Form.scss";
import { useState } from "react";
import React from "react";
//LAST UPDATED 08/12/24==========================================
export default function Form({ children, onsubmit, onCancel }) {
  //Initialisation-------------------------------------------------------

  //Hooks----------------------------------------------------------------

  //State----------------------------------------------------------------

  //Context--------------------------------------------------------------

  //Handlers-------------------------------------------------------------
  // const handleSubmit = (event, onsubmit) => {
  //   event.preventDefault();
  //   onsubmit;
  // };
  const handleCancel = () => onCancel;
  //view-----------------------------------------------------------------
  return (
    <form
      className="BorderedForm"
      onSubmit={(event) => handleSubmit(event, onsubmit)}
    >
      <div className="FormTray">{children}</div>

      {/* <ActionTray> */}
      <div className="form-buttons">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      {/* </ActionTray> */}
    </form>
  );
}
function Item({ children, label, htmlFor, advice, error }) {
  // Initialisation ------------------------------
  // Hooks ---------------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <div className="FormItem">
      <label className="FormLabel" htmlFor={htmlFor}>
        {label}
      </label>
      {advice && <p className="FormAdvice">{advice}</p>}
      {children}
      {error && <p className="FormError">{error}</p>}
    </div>
  );
}

function useForm(
  initialRecord,
  conformance,
  { isValid, errorMessage },
  onCancel,
  onSubmit
) {
  //Initialisation-------------------------------------------------------

  //Hooks----------------------------------------------------------------

  //State----------------------------------------------------------------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
    Object.keys(initialRecord).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );

  //Context--------------------------------------------------------------

  //Handlers-------------------------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = conformance.includes(name) ? parseInt(value) : value;
    console.log(newValue + "handleChange");
    setRecord({ ...record, [name]: newValue });
    setErrors({
      ...errors,
      [name]: isValid[name](newValue) ? null : errorMessage[name],
    });
    console.log(record);
  };
  const isValidRecord = (record) => {
    console.log("isValidRecord");
    let isRecordValid = true;
    Object.keys(record).forEach((key) => {
      if (isValid[key](record[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isRecordValid = false;
      }
    });
    return isRecordValid;
  };

  const handleSubmit = () => {
    console.log(handleSubmit);
    console.log("Hello again");
    isValidRecord(record) && onSubmit(record);
    setErrors({ ...errors });
  };
  //view-----------------------------------------------------------------
  return [record, errors, handleChange, handleSubmit];
}
//-----------------------------------
//Compose Form Object
//-----------------------------------
Form.Item = Item;
Form.useForm = useForm;
