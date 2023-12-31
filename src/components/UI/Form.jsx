import "./Form.scss";
import { useState } from "react";
import React from "react";
//LAST UPDATED 08/12/24==========================================
export default function Form({ children, onSubmit, onCancel }) {
  //Initialisation-------------------------------------------------------

  //Hooks----------------------------------------------------------------

  //State----------------------------------------------------------------

  //Context--------------------------------------------------------------

  //Handlers-------------------------------------------------------------

  //view-----------------------------------------------------------------
  return (
    <form className="BorderedForm">
      <div className="FormTray">{children}</div>

      <div className="form-buttons">
        <button type="submit" onClick={onSubmit}>
          Submit
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
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

  const handleSubmit = (event) => {
    event.preventDefault();
    isValidRecord(record) && onSubmit(record) && onCancel();
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
