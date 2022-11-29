import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const KkmBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
`;

export const KkmLogo = styled.img`
  width: 7%;
  object-fit: contain;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: ${(props) => (!props.column ? "row" : "column")};
  justify-content: space-between;
  width: 39%;
  padding: 6% 5%;
  border-radius: 18px;

  background-color: #ebf0ff;
`;

export const SubTitle = styled.p`
  font-size: smaller;
  color: #828282;
`;
