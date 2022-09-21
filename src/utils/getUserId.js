import axios from "axios";

export const getUserId = async (k_id) => {
  let user_id = 0;
  await axios.get(`/getUserId?k_id=${k_id}`).then((id) => (user_id = id.data));
  return user_id;
};
