import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuthStatus = () => {
  const { checkStatus, loggedIn } = useContext(AuthContext);

  return { loggedIn, checkStatus };
};

export default useAuthStatus;
