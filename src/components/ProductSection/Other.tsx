import React from "react";

// Component for loading categories
const LoadingCategoies = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item: number) => (
        <div
          key={item}
          style={{
            width: "150px",
            height: "30px",
            background: "lightgrey",
            marginBottom: "40px",
          }}
        ></div>
      ))}
    </>
  );
};

// Method for loading products
export const LoadingProducts = () => {
  return (
    <div style={{ display: "flex", gap: "48px" }}>
      {[0, 1, 2].map((item: number) => (
        <div
          key={item}
          style={{
            width: "320px",
            height: "500px",
            background: "lightgrey",
          }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingCategoies;
