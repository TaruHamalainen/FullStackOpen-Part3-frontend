import React from "react";
import { BsBook } from "react-icons/bs";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl p-3 flex gap-3 items-center justify-center mx-auto">
        <h1 className="text-2xl uppercase">PhoneBook</h1>
        <BsBook className="text-2xl " />
      </div>
    </header>
  );
}
