import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {Route, Navigate} from "react-router-dom"

export default function Profile() {
  const { auth } = useContext(AuthContext);
  const user = auth.currentUser;
  return <div>Profile: {user && user.displayName}</div>;
}
