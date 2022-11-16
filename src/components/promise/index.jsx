import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { channelId } from "../../data/chat";
import { updateStage } from "../../utils/promise";
import { MakePromise } from "./make";
import * as S from "./promise.style";
import { CompletedStage } from "./stages/completed";
import { EndedStage } from "./stages/ended";
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
      ) : null}

      <S.PopUpLayout>
        {promise.stage % 3 === 0 ? (
          <CompletedStage
            clickHandle={() => setIsClicked(1)}
            stage={promise.stage}
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
