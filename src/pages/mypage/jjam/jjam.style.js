import styled from "styled-components";

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1%;
  height: 3fr;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const MoreBtn = styled.button`
  width: 30%;
  border: none;
  padding: 2% 0;
  border-radius: 10px;
`;
