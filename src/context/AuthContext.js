import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkStatus, setCheckStatus] = useState(true);
  const auth = getAuth();
  const logout = async () => {
    try {
      await signOut(auth);
      notify("Deconnexion reussie", "success");
    } catch (error) {
      notify(error.code, "error");
    }
  };
  const notify = (message, type) => toast(message, { type });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckStatus(false);
    });
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, notify, logout, checkStatus, loggedIn, currentUser:auth.currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
