import { useState } from "react";
import { useEffect } from "react";
import API from "./API";

export default function useLoad(endpoint) {
  //State---------------------------------------------------------

  const [records, setRecords] = useState(null);
  const [loadingMessage, setloadingMessage] = useState("Loading Records...");

  //Methods---------------------------------------------------------

  const loadRecords = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setRecords(response.result)
      : setloadingMessage(response.message);
  };
  useEffect(() => {
    loadRecords(endpoint);
  }, [endpoint]);
  //Return---------------------------------------------------------
  return [records, setRecords, loadingMessage, loadRecords];
}
