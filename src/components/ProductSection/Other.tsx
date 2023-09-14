import React from "react";

const LoadingCategoies = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item: number) => (
        <div
          key={item}
          style={{
            width: "100px",
            height: "30px",
            background: "lightgrey",
            marginBottom: "20px",
          }}
        ></div>
      ))}
    </>
  );
};

export const LoadingProducts = () => {
  return (
    <div style={{ display: "flex", gap: "48px" }}>
      {[0, 1, 2, 3].map((item: number) => (
        <div
          key={item}
          style={{
            width: "320px",
            height: "320px",
            background: "lightgrey",
          }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingCategoies;
