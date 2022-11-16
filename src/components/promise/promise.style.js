import styled from "styled-components";
export const PopUpLayout = styled.div`
  display: flex;
  position: absolute;
  width: 20%;

  flex-direction: column;
  row-gap: 10px;
  z-index: 2;

  padding: 1.5% 2%;
  background-color: #f6f8ff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.p`
  font-weight: 600;
  color: #4e6eff;
  font-size: "smaller";
`;

export const SubDesc = styled.span`
  color: #797979;
  font-size: smaller;
`;

export const PromiseData = styled.span`
  font-weight: 500;
  font-size: 90%;
`;

export const DataBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3%;
  border-radius: 5px;
  background-color: #ebf0ff;
`;

export const PromiseBtn = styled.button`
  width: ${(props) => props.width};
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

export const Input = styled.input`
  background-color: #dfe6ff;
  border-radius: 5px;
  padding: 10px 10px;
  border: none;
  outline: none;
  margin-right: 3px;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
