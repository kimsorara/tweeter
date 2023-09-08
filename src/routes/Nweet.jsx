import React, { useState } from "react";
import { doc, updateDoc, deleteField, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { dbService, storageSevice } from "fbInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
const Nweet = ({ data, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newEdite, setNewEdit] = useState(data.newText);

  const dd = async () => {
    //특정 필드 지우기
    const filedref = doc(dbService, "nweets", "list");
    await updateDoc(filedref, {
      gege: deleteField(),
    });
  };
  const toggleEdit = () => {
    setEditing((pre) => !pre);
  };

  const deleteBtn = async (data) => {
    const NweetTextRef = doc(dbService, "nweets", `${data.id}`);
    await deleteDoc(NweetTextRef);
    if (data.imgeUrl) {
      const imfRef = ref(storageSevice, data.imgeUrl);
      await deleteObject(imfRef);
    }
  };
  const changeValue = (e) => {
    const {
      target: { value },
    } = e;
    setNewEdit(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const updateTarget = doc(dbService, "nweets", `${data.id}`);
    await updateDoc(updateTarget, { newText: newEdite });
    toggleEdit();
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              value={newEdite}
              className="formInput"
              onChange={changeValue}
              required
              placeholder="수정해주세요"
            />
            <input className="formBtn" type="submit" value="Update Nweet" />
          </form>
          <span onClick={toggleEdit} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{data.newText}</h4>
          {data.imgeUrl && (
            <img src={data.imgeUrl} alt="이미지" width="100px" height="100px" />
          )}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={deleteBtn}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
