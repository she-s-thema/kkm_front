import { CustomAxios } from "./customAxios";

export const raiseHeart = async (pid, oid, huid) => {
  await CustomAxios.post("/heart", {
    heart_id: 0,
    post_id: pid,
    post_owner_id: oid,
    heart_user_id: huid,
    heart_state: 1,
    time: new Date(),
  });
};

export const getJjamList = async (uid) => {
  const response = await CustomAxios.get(`/jjamList?user_id=${uid}`);
  return response.data;
};

export const isMyJjam = async (pid, uid) => {
  return await getJjamList(uid).then((data) => {
    const jjamList = data.filter((val) => val.post_id == pid);
    return jjamList.length > 0 ? true : false;
  });
};

export const cancelHeart = async (pid, uid) => {
  await CustomAxios.put(`/heart/cancel?post_id=${pid}&user_id=${uid}`);
};
