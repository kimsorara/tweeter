import React, { useEffect, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { dbService, firebaseAuth } from "fbInstance";
import { useNavigate } from "react-router-dom";
import { query, orderBy, getDocs, collection, where } from "firebase/firestore";
const Profile = ({ userInfo, refresh }) => {
  const navigate = useNavigate();
  const [newDisplayName, setDisplayName] = useState(userInfo.displayName);
  const logOut = () => {
    signOut(firebaseAuth)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const getMyNweets = async () => {
    const filedref = collection(dbService, "nweets");
    const q = query(
      filedref,
      where("creatorId", "==", userInfo.uid),
      orderBy("createdAt", "asc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  }, [userInfo]);
  const changeHandler = (e) => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };
  const submithandler = async (e) => {
    e.preventDefault();
    if (userInfo.displayName !== newDisplayName) {
      const update = await updateProfile(firebaseAuth.currentUser, {
        displayName: newDisplayName,
      });
      refresh();
    }
  };
  return (
    <div className="container">
      <form onSubmit={submithandler} className="profileForm">
        <input
          type="text"
          placeholder="디스플레이 네임"
          value={newDisplayName}
          onChange={changeHandler}
          className="formInput"
        />
        <input
          type="submit"
          style={{
            marginTop: 10,
          }}
          onClick={submithandler}
        />
      </form>
      <button className="formBtn cancelBtn logOut" onClick={logOut}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
