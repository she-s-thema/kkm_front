import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const channelId = atom({
  key: "ChannelId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
