import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import db from "../../config/firebaseConfig";
import { userInfo } from "../../data/user";

export const Channels = () => {
  const [loanerChat, setLoanerChat] = useState([]);
  const [ownerChat, setOwnerChat] = useState([]);
  const user = useRecoilValue(userInfo);
  const user_id = user["user_id"];

  const getLoanerChats = () => {
    const q = query(
      collection(db, "channels"),
      where("loaner_id", "==", user_id)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      setLoanerChat([]);
      querySnapshot.forEach((doc) => {
        setLoanerChat((prev) => [...prev, doc.data()]);
      });
    });
  };

  useMemo(() => getLoanerChats(), []);

  return (
    <div>
      {loanerChat &&
        loanerChat.map((data) => (
          <div key={data.id}>
            <Link to={`${data.id}`}>{data.id}</Link>
          </div>
        ))}
    </div>
  );
};
