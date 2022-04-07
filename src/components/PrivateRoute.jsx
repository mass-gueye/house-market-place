import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const { loggedIn, checkStatus } = useAuthStatus();
  if (checkStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to={{ pathname: "/sign-in" }} />;
}
