import React from "react";
import { BsPerson, BsPhone } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import server from "../services/server";

export default function Persons({
  persons,
  setMessage,
  setErrorType,
  setPersons,
  filter,
}) {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} from phonebook?`)) {
      server.remove(id);
      setMessage(`${name} was removed from phonebook`);
      setErrorType("success");
      const newPersonList = persons.filter((person) => person.id !== id);
      setPersons(newPersonList);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const namesToFind = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto p-3">
      {filter === ""
        ? persons.map((person) => (
            <Person
              key={person.name}
              person={person}
              handleDelete={() => handleDelete(person.id, person.name)}
            />
          ))
        : namesToFind.map((person) => (
            <Person
              key={person.name}
              person={person}
              handleDelete={() => handleDelete(person.id, person.name)}
            />
          ))}
    </div>
  );
}

const Person = ({ person, handleDelete }) => {
  return (
    <div className="bg-white shadow-md p-3 rounded-lg">
      <div className="flex  items-center justify-between ">
        <div>
          <div className="flex gap-2 items-center">
            <BsPerson />
            <p>{person.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <BsTelephone />
            <p>{person.number}</p>
          </div>
        </div>
        <button onClick={handleDelete}>
          <RiDeleteBin6Line className="text-lg" />
        </button>
      </div>
    </div>
  );
};
