import moment from "moment";
import React from "react";
import styled from "styled-components";

export const PromisePopUp = ({ promise }) => {
  console.log(promise);
  return (
    <PopUpLayout>
      {promise ? (
        <>
          <p style={{ fontWeight: 600, color: "#4e6eff", fontSize: "smaller" }}>
            상대방과 약속이 있어요!
          </p>
          <DataBox>
            <PromiseData>{promise.place}</PromiseData>
            <SubDesc>에서</SubDesc>
          </DataBox>
          <DataBox>
            <PromiseData>
              {moment(promise.time.toDate().toString()).format(
                "MM월 DD일 hh시 mm분"
              )}
            </PromiseData>
            <SubDesc>에 만나서</SubDesc>
          </DataBox>
          <DataBox>
            <PromiseData>
              {moment(promise.period["start_date"].toDate().toString()).format(
                "MM월 DD일"
              )}
            </PromiseData>
            <SubDesc>부터 </SubDesc>
            <PromiseData>
              {moment(promise.period["end_date"].toDate().toString()).format(
                "MM월 DD일"
              )}
            </PromiseData>
            <SubDesc>까지 빌릴게요</SubDesc>
          </DataBox>
        </>
      ) : (
        <>
          <p style={{ fontWeight: 600, color: "#4e6eff", fontSize: "smaller" }}>
            상대방과 약속이 없어요!
          </p>
          <PromiseBtn>약속 잡기</PromiseBtn>
        </>
      )}
    </PopUpLayout>
  );
};

const PopUpLayout = styled.div`
  display: flex;
  position: absolute;
  width: 18%;

  flex-direction: column;
  row-gap: 5px;
  z-index: 2;

  padding: 1.5% 2%;
  background-color: #f6f8ff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const SubDesc = styled.span`
  color: #797979;
  font-size: smaller;
`;

const PromiseData = styled.span`
  font-weight: 500;
  font-size: 90%;
`;

const DataBox = styled.div`
  padding: 3%;
  border-radius: 5px;
  background-color: #ebf0ff;
`;

const PromiseBtn = styled.button`
  width: 100%;
  color: white;
  background-color: #595fff;
  border: none;
  border-radius: 10px;
  padding: 5% 0;
  &:hover {
    background-color: #4448c2;
    color: #c2c2c2;
  }
`;
