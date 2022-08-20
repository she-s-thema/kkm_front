import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userInfo = atom({
  key: "userInfo",
  default: {
    userInfo: {
      user_id: "0",
      nickname: "",
      k_id: 0,
      k_img_url: "",
      lat: 0.0,
      lon: 0.0,
      address: "",
    },
  },
  effects_UNSTABLE: [persistAtom],
});
