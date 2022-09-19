import React, { useEffect, useState } from "react";
import firestore, { createChannel } from "../utils/firebase";
import moment from "moment";

export const Test = () => {
  const getDateOrTime = (ts) => {
    const now = moment().startOf("day");
    const target = moment(ts).startOf("day");
    return moment(ts).format(now.diff(target, "days") > 0 ? "MM/DD" : "HH:mm");
  };
  useEffect(() => {
    // const bucket = firestore.collection("channels");
    // bucket
    //   .collection("messages")
    //   .add({ createAt: "", description: "", id: "", title: "test" })
    //   .then((docRef) => {
    //     // 새로운 document의 id
    //     console.log(docRef.id);
    //   });

    console.log(createChannel("hi", "test"));
  });
  return (
    <div>
      <input type="text" />
      <button>전송</button>
    </div>
  );
};
