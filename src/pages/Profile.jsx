import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { db } from "../firebase.config";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const { auth, logout, notify } = useContext(AuthContext);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user.displayName,
    email: user.email,
  });

  const [changeDetails, setChangeDetails] = useState(false);

  const { name, email } = formData;
  const handleChangeDetails = async () => {
    try {
      if (user.displayName !== name) {
        //  update display name in firebase
        await updateProfile(user, { displayName: name });

        // update display name in firestore
        const userRef = doc(db, "users".user.uid);
        await updateDoc(userRef, { name });

        notify("User details updated successfully", "success");
      }
    } catch (error) {
      notify("Could not update profile details", "error");
    }
  };

  const onChangeDetails = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/sign-in");
  };
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        {user && (
          <button type="button" onClick={handleLogout} className="logOut">
            Deconnexion
          </button>
        )}
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && handleChangeDetails();
              setChangeDetails((prev) => !prev);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChangeDetails}
            />
            <input
              type="text"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChangeDetails}
            />
          </form>
        </div>
      </main>
    </div>
  );
}
