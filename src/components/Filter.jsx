import React from "react";
import { BsSearch } from "react-icons/bs";

export default function Filter({ filter, setFilter }) {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <div className="max-w-lg p-3 mx-auto mb-3">
      <p className="text-center mb-1">Filter contacts</p>
      <div className="flex">
        <input
          className="border p-3 rounded-lg w-full"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
}
