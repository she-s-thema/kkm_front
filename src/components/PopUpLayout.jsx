import React from "react";

export const PopUpLayout = ({ children }) => {
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        background: " rgba(0, 0, 0, 0.53)",
        top: 0,
        left: 0,
        zIndex: 4,
      }}
    >
      <div
        style={{
          width: "30%",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "2% 3%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
