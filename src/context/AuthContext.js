import { getAuth } from "firebase/auth";
import { createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = getAuth();
  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
