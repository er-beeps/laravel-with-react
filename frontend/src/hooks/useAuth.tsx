import AuthContext from "../contexts/JWTAuthContext";
import React,{ useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;
