import React, { useState, useEffect } from "react";
import { dbService } from "fbInstance";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Nweet from "./Nweet";
import NweetFactory from "components/NweetFactory";
const Home = ({ userInfo }) => {
  const [textList, setTextList] = useState([]);
  // const getList = async () => {
  //   //전체조회 구식
  //   const textRef = collection(dbService, "nweets");
  //   const nweets = await getDocs(textRef);
  //   nweets.forEach((item) => {
  //     const newObj = {...item.data(), id: item.id};
  //     setTextList((pre) => [newObj, ...pre]);
  //   });
  // };

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snap) => {
      const snapArr = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTextList(snapArr);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userInfo={userInfo} />
      <div style={{ marginTop: 30 }}>
        {textList.length > 0 &&
          textList.map((el) => (
            <Nweet
              key={el.id}
              data={el}
              isOwner={el.creatorId === userInfo.uid}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
