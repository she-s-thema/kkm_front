import styled from "styled-components";

export const Profile = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  column-gap: 6%;
`;

export const KakaoImg = styled.img`
  width: 15%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 100%;
`;

export const Info = styled.div`
  row-gap: 5px;
  display: flex;
  flex-direction: column;
`;

export const NickName = styled.p`
  font-weight: 600;
  font-size: 150%;
`;

export const EditBtn = styled.button`
  color: #8e8e8f;
  text-decoration-line: underline;
  text-align: left;
  border: none;
  background-color: white;
`;
