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
  padding: 10px 15px;
  max-width: 50%;
  font-size: 80%;

  color: black;
  background-color: ${({ who }) => (who ? "white" : "#DFE6FF")};

  border: ${({ who }) => who && "0.2px solid #cccccc"};
  border-radius: ${({ who }) =>
    who === "opponent" ? "15px 15px 15px 0px" : "15px 15px 0px 15px"};
`;

export const ImgContent = styled.img`
  width: 45%;
  border-radius: 5px;
`;

export const InputBox = styled.div`
  display: flex;
  width: 96%;
  height: 5%;
  padding: 2% 4%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

export const ChatInput = styled.input`
  width: 74%;
  border: none;
  outline: none;
`;

export const ChatImgUpload = styled.label`
  width: 4%;
  display: flex;
  border: none;
  outline: none;
`;

export const SendBtn = styled.button`
  display: flex;
  justify-content: flex-end;
  width: 10%;
  border: none;
  background-color: white;
  color: #595fff;
`;

export const PromiseBox = styled.div`
  width: 4%;
  display: flex;
  border: none;
  outline: none;
`;
