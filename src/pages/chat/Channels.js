import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import db from "../../config/firebaseConfig";
import { userInfo } from "../../data/user";

export const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [loanerChat, setLoanerChat] = useState([]);
  const [ownerChat, setOwnerChat] = useState([]);
  const user = useRecoilValue(userInfo);
  const user_id = user["user_id"];

  const getChats = () => {
    const q1 = query(
      collection(db, "channels"),
      where("loaner_id", "==", user_id)
    );

    const unsub1 = onSnapshot(q1, (querySnapshot) => {
      setLoanerChat([]);
      querySnapshot.forEach((doc) => {
        setLoanerChat((prev) => [...prev, doc.data()]);
      });
    });

    const q2 = query(
      collection(db, "channels"),
      where("owner_id", "==", user_id)
    );

    const unsub2 = onSnapshot(q2, (querySnapshot) => {
      setOwnerChat([]);
      querySnapshot.forEach((doc) => {
        setOwnerChat((prev) => [...prev, doc.data()]);
      });
    });
  };

  useMemo(() => {
    getChats();
  }, []);

  useEffect(() => {
    const channels = [];
    loanerChat.forEach((doc) => channels.push(doc));
    ownerChat.forEach((doc) => channels.push(doc));

    channels.sort((a, b) => {
      return a.sendAt > b.sendAt ? -1 : a.sendAt < b.sendAt ? 1 : 0;
    });

    setChannels(channels);
  }, [ownerChat, loanerChat]);

  return (
    <div>
      {channels &&
        channels.map((data) => (
          <div key={data.id}>
            <Link to={`${data.id}`}>
              <span>
                {data.loaner_id === user_id ? data.owner_id : data.loaner_id}
              </span>
              <span>{data.lastText}</span>
            </Link>
          </div>
        ))}
    </div>
  );
};
