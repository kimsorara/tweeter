import { useState } from "react";
import { dbService, storageSevice } from "fbInstance";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userInfo }) => {
  const [newText, setNewText] = useState("");
  const [attachment, setAttachment] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    let imgeUrl = "";
    if (attachment) {
      const imgRef = ref(storageSevice, `${userInfo.uid}/${uuidv4()}`);
      // 원시 문자열, base64, base64url 또는 data_url로 인코딩된 문자열을 Cloud Storage에 업로드할 수 있다
      const response = await uploadString(imgRef, attachment, "data_url");
      console.log(response.ref, "asdf");
      //다운로드
      imgeUrl = await getDownloadURL(response.ref);
    }

    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        newText,
        createdAt: new Date().toLocaleString(),
        creatorId: userInfo.uid,
        imgeUrl,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setNewText("");
    setAttachment("");
  };
  const changeHandler = (e) => {
    setNewText(e.target.value);
  };
  const fileChange = (e) => {
    const {
      target: { files },
    } = e;
    const reder = new FileReader();
    //이벤트 리스너
    reder.onload = (finished) => {
      const {
        currentTarget: { result },
      } = finished;
      setAttachment(result);
    };
    reder.readAsDataURL(files[0]);
  };
  const clearPhoto = () => {
    setAttachment("");
  };
  return (
    <form onSubmit={submitHandler} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={newText}
          onChange={changeHandler}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={fileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt="사진"
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={clearPhoto}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;
