import React from "react";
import styled from "styled-components";

export const Layout = ({ children }) => {
  return <LayoutStyle>{children}</LayoutStyle>;
};

const LayoutStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
