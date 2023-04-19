import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <svg className="w-8 h-8 animate-spin">
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{ stroke: "rgb(29, 161, 242)", opacity: "0.2" }}
        />
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{
            stroke: "rgb(29, 161, 242)",
            strokeDasharray: "80",
            strokeDashoffset: "60",
          }}
        />
      </svg>
    </div>
  );
};

export default Loader;
