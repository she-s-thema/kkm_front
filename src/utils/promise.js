import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import db from "../config/firebaseConfig";

export const makePromise = async (
  lid,
  oid,
  sdate,
  edate,
  place,
  time,
  stage,
  ch_id
) => {
  const newProRef = doc(collection(db, "channels", ch_id, "promise"));
  stage === 0
    ? await setDoc(newProRef, {
        id: newProRef.id,
        loaner_id: lid,
        owner_id: oid,
        p_id: "first",
        period: {
          start_date: sdate,
          end_date: edate,
        },
        place: place,
        time: time,
        state: 0,
        madeAt: new Date(),
      })
    : await setDoc(newProRef, {
        id: newProRef.id,
        loaner_id: lid,
        owner_id: oid,
        p_id: "second",
        place: place,
        time: time,
        state: 0,
        madeAt: new Date(),
      });
};

export const getPromises = async (ch_id) => {
  const result = {};
  const q = query(
    collection(db, "channels", ch_id, "promise"),
    orderBy("madeAt")
  );
  onSnapshot(q, (qsn) => {
    if (!qsn.empty) {
      qsn.forEach((doc) => {
        result.stage = 1;
        result.loaner_id = doc.data().loaner_id;
        result.owner_id = doc.data().owner_id;
        result.madeAt = doc.data().madeAt;
        result.p_id = doc.data().p_id;
        result.period = doc.data().period;
        result.place = doc.data().place;
        result.state = doc.data().state;
        result.time = doc.data().time;
      });
    } else {
      const docRef = doc(db, "channels", ch_id);
      getDoc(docRef).then((data) => {
        result.stage = 0;
        result.loaner_id = data.data().loaner_id;
        result.owner_id = data.data().owner_id;
      });
    }
  });
  return result;
};
