import { SettingsContext } from "../contexts/SettingsContext";
import React,{ useContext } from "react";

const useSettings = () => useContext(SettingsContext);

export default useSettings;
