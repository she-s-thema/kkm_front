import firebase from "firebase/compat/app";
import { addDoc, setDoc } from "firebase/firestore";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXhCxeiJhLGl7Pyt83JSdCL-y4diqsB2c",
  authDomain: "simplechat-1508b.firebaseapp.com",
  projectId: "simplechat-1508b",
  storageBucket: "simplechat-1508b.appspot.com",
  messagingSenderId: "429140460355",
  appId: "1:429140460355:web:a0dda2da8a90132d3da5f6",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export default firestore;

export const createChannel = async ({ title, description }) => {
  const newChannelRef = firestore.collection("channels").doc();
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description,
    createAt: Date.now(),
  };
  await addDoc(newChannelRef, newChannel);
  return id;
};
