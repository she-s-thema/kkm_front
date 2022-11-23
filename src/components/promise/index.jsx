import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { channelId } from "../../data/chat";
import { updateStage } from "../../utils/promise";
import { GiveKkomak } from "./giveKkomak";
import { MakePromise } from "./make";
import * as S from "./promise.style";
import { CompletedStage } from "./stages/completed";
import { EndedStage } from "./stages/ended";
import { Kkomak } from "./stages/kkomak";
import { WaitingStage } from "./stages/wating";

export const PromisePopUp = ({ promise, handlePopUp }) => {
  const ch_id = useRecoilValue(channelId);
  const [isClicked, setIsClicked] = useState(0);

  const updatePromise = () => {
    updateStage(ch_id, promise.id, promise.stage + 1);
    setIsClicked(0);
  };

  return (
    <>
      {isClicked === 1 ? (
        <MakePromise
          promise={promise}
          handlePopUp={() => setIsClicked(0)}
          promisePopUp={handlePopUp}
        />
      ) : isClicked === 2 ? (
        <GiveKkomak
          updatePromise={updatePromise}
          handlePopUp={() => setIsClicked(0)}
          promisePopUp={handlePopUp}
          promise={promise}
        />
      ) : null}

      <S.PopUpLayout>
        {promise.stage === 0 || promise.stage === 3 || promise.stage === 7 ? (
          <CompletedStage
            clickHandle={() => setIsClicked(1)}
            stage={promise.stage}
          />
        ) : promise.stage === 6 ? (
          <Kkomak
            handlePopUp={handlePopUp}
            clickHandle={() => setIsClicked(2)}
          />
        ) : promise.stage === 1 || promise.stage === 4 ? (
          <WaitingStage
            promise={promise}
            updatePromise={updatePromise}
            handlePopUp={handlePopUp}
          />
        ) : (
          <EndedStage
            promise={promise}
            updatePromise={updatePromise}
            handlePopUp={handlePopUp}
          />
        )}
      </S.PopUpLayout>
    </>
  );
};
