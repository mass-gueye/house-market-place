import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRighIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import VisibilityIcon from "../assets/svg/visibilityIcon.svg";
import { db } from "../firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = await userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const userFormData = { ...formData };
      delete userFormData.password;
      userFormData.timestamp = serverTimestamp();

      // // Add a new document in collection "listings"
      await setDoc(doc(db, "users", newUser.uid), userFormData);

      navigate("/");
    } catch (error) {
      console.log(error.code, error.message);
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
          <p className="pageHeader">Bienvenue !</p>
        </header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={handleChange}
          />
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

          <div className="signUpBar">
            <p className="signUpText">Créer un compte</p>
            <button className="signUpButton">
              <ArrowRighIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <Link to={{ pathname: "/sign-in" }} className="registerLink2">
          Se connecter ?
        </Link>

        {/* Google OAuth */}
      </div>
    </>
  );
}
