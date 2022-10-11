import React from "react";
import styled from "styled-components";

export const Layout = ({ children, match, location, history }) => {
  return <LayoutStyle>{children}</LayoutStyle>;
};

const LayoutStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
