import styled from "styled-components";

export const Frame = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  background-color: white;
  width: 100%;
  height: 70vh;
  margin-top: 10px;
  overflow-y: scroll;
  padding: 2%;
`;
export const ContentBox = styled.div`
  display: flex;
  justify-content: ${({ who }) => (who ? "flex-start" : "flex-end")};
`;

export const Content = styled.span`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 10px 19px;

  color: black;
  background-color: ${({ who }) => (who ? "white" : "#DFE6FF")};

  border: ${({ who }) => who && "0.2px solid #cccccc"};
  border-radius: ${({ who }) =>
    who === "opponent" ? "100px 100px 100px 0px" : "100px 100px 0px 100px"};
`;
