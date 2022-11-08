import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)}>
      <svg
        width="20%"
        height="20%"
        viewBox="0 0 13 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.2095 18.0927L4.41675 10.5L12.2095 2.90732L12.2096 2.90739L12.2132 2.90357C12.4836 2.62096 12.6607 2.24693 12.6607 1.8416C12.6607 1.00258 11.9952 0.35 11.1691 0.35C10.7576 0.35 10.404 0.500894 10.1279 0.776637C10.1277 0.776841 10.1275 0.777045 10.1273 0.777249L1.35811 9.35482C1.35799 9.35494 1.35786 9.35506 1.35774 9.35518C1.01538 9.68547 0.85 10.0617 0.85 10.5C0.85 10.9375 1.01483 11.3145 1.35866 11.6344L10.1273 20.2228C10.1275 20.223 10.1277 20.2232 10.1279 20.2234C10.404 20.4991 10.7576 20.65 11.1691 20.65C11.9952 20.65 12.6607 19.9974 12.6607 19.1584C12.6607 18.7412 12.4831 18.3785 12.2132 18.0964L12.2133 18.0964L12.2095 18.0927Z"
          fill="#1C1C1E"
          stroke="black"
          strokeWidth="0.05"
        />
      </svg>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: white;
  width: 8%;
`;
