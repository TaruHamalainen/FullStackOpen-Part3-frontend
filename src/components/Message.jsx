import React from "react";

export default function Message({ errorType, message }) {
  return (
    <div
      className={`max-w-lg mx-auto p-3 rounded-lg ${
        message ? "block" : "hidden"
      } ${errorType === "success" ? "bg-green-700" : "bg-red-700"} `}
    >
      <p className="text-center text-lg text-white ">{message}</p>
    </div>
  );
}
