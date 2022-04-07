import React, { useContext, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { auth, notify } = useContext(AuthContext);
  const navigate = useNavigate();
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      // Password reset email sent!
      notify("email de réinitialisation envoyé", "info");
      setTimeout(() => navigate("/sign-in"), 5000);
    } catch (error) {
      notify("nous n'avons pas pu envoyer l'email de réinitialisation", "error");
    }
  };

  const handleChange = (e) => setEmail(e.target.value);

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Mot de passe oublié</p>
      </header>
      <main>
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleChange}
          />

          <Link to="/sign-in" className="forgotPasswordLink">
            Se connecter ?
          </Link>
          <div className="signInBar">
            <p className="signInText">Reinitialiser</p>
            <button
              className="signInButton"
              disabled={!email}
              style={{ cursor: !email ? "not-allowed" : "pointer" }}
            >
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
