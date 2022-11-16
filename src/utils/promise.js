import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
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
  ch_id,
  user_id
) => {
  const newProRef = doc(collection(db, "channels", ch_id, "promise"));
  stage === 1 || stage === 7
    ? await setDoc(newProRef, {
        id: newProRef.id,
        loaner_id: lid,
        owner_id: oid,
        p_id: 1,
        period: {
          start_date: sdate,
          end_date: edate,
        },
        place: place,
        time: time,
        stage: 1,
        from_id: user_id,
        madeAt: new Date(),
      })
    : await setDoc(newProRef, {
        id: newProRef.id,
        loaner_id: lid,
        owner_id: oid,
        p_id: 2,
        place: place,
        time: time,
        stage: 4,
        madeAt: new Date(),
        from_id: user_id,
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
        result.stage = doc.data().stage;
        result.loaner_id = doc.data().loaner_id;
        result.owner_id = doc.data().owner_id;
        result.madeAt = doc.data().madeAt;
        result.p_id = doc.data().p_id;
        result.period = doc.data().period;
        result.place = doc.data().place;
        result.time = doc.data().time;
        result.from_id = doc.data().from_id;
        result.id = doc.data().id;
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

export const updateStage = async (ch_id, p_id, stnum) => {
  const proRef = doc(db, "channels", ch_id, "promise", p_id);
  await updateDoc(proRef, {
    stage: stnum,
  });
};
