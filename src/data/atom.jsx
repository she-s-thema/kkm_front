import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const kakaoUserInfo = atom({
  key: "kakaoUserInfo",
  default: {
    userInfo: {
      user_id: "0",
      nickname: "",
      k_id: 0,
      k_img_url: "",
    },
  },
  effects_UNSTABLE: [persistAtom],
});
