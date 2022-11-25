import styled from "styled-components";

const Input = styled.input`
  border: none;
  outline: none;

  &::placeholder {
    color: #b8b8b8;
  }
`;

const Button = styled.button`
  width: 100%;
  min-height: 50px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
`;

export const Layout = styled.div`
  width: 44%;
  row-gap: 10px;
  padding: 0 3% 12% 3%;
  background-color: white;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const TitleInput = styled(Input)`
  width: 96%;
  padding: 5% 2%;
  font-size: large;
  font-weight: 600;
`;

export const VerticalBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const SelectedImg = styled.img`
  width: 32.5%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: #f6f6f6;
  border: none;
`;

export const AddImgBtn = styled(Button)`
  background-color: #d1d1d1;
  color: white;
  transition: all 0.3s ease;
  &:hover {
    background-color: #aeaeae;
  }
`;

export const CostBox = styled(VerticalBox)`
  border-bottom: 0.5px solid #5c5c5c;
`;

export const CostInput = styled(Input)`
  width: 80%;
  padding: 4% 2%;
  font-size: 110%;
  font-weight: 600;
  -webkit-appearance: none;
`;

export const WonIcon = styled.span`
  font-size: 110%;
  font-weight: 500;
  margin-right: 2%;
`;

export const Desc = styled.textarea`
  width: 96%;
  padding: 4% 2%;
  border: none;
  border-bottom: 0.5px solid #5c5c5c;
  outline: none;
  resize: none;
  min-height: 30%;

  &::placeholder {
    color: #b8b8b8;
  }
`;

export const PostBtn = styled(Button)`
  width: 30%;
  background: lightgrey;
  display: inline-block;
  transform: perspective(1px) translateZ(0);
  position: relative;
  border-radius: 0px;
  transition: color 0.3s;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: #595fff;
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: transform 0.3s ease-out;
  }

  &:hover {
    color: white;
    &::before {
      transform: scaleX(1);
    }
  }
`;
