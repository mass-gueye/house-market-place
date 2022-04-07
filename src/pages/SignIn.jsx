import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import VisibilityIcon from "../assets/svg/visibilityIcon.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";

export default function SignIn() {
  const { notify, auth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      notify("mauvaises références d'identification", "");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Content de te revoir !</p>
        </header>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={handleChange}
            />
            <img
              src={VisibilityIcon}
              alt="Show password"
              className="showPassword"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Mot de passe oublié
          </Link>

          <div className="signInBar">
            <p className="signInText">Connexion</p>
            <button className="signInButton" disabled={!email || !password}>
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* Google OAuth */}

        <Link to={{ pathname: "/sign-up" }} className="registerLink">
          Créer un compte ?
        </Link>
      </div>
    </>
  );
}
