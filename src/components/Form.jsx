import React, { useState } from "react";
import server from "../services/server";

export default function Form({
  persons,
  setPersons,
  setErrorType,
  setMessage,
}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const reset = () => {
    setName("");
    setNumber("");
  };

  // adding new person to phone book
  const addNewPerson = (event) => {
    event.preventDefault();

    // new person to add to phonebook
    const person = {
      name: name,
      number: number,
    };

    // is person existing already in phonebook?
    const existingPerson = persons
      .map((person) => person.name)
      .includes(person.name);

    // if person is not in  phonebook, add person
    if (!existingPerson) {
      server
        .add(person)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setErrorType("success");
          setMessage(`${person.name} was added to phonebook`);

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorType("error");
          setMessage(error.response.data.error);

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });

      // if person exists in phonebook and user confirms to edit number
    } else {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace old number with new one (${person.number})?`
        )
      ) {
        const personToChange = persons.find((p) => p.name === person.name);
        const changedPerson = { ...personToChange, number: person.number };

        // update number for existing person

        server
          .update(personToChange.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((p) =>
                p.id !== personToChange.id ? p : response.data
              )
            );
            setErrorType("success");
            setMessage(`${personToChange.name} number was updated`);

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error.response.data);
            setErrorType(null);
            setMessage(error.response.data.error);

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    }

    // reset inputs
    reset();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };
  return (
    <div className="max-w-lg p-3 mx-auto mb-3">
      <h2 className="text-center text-lg uppercase mb-3">Add Contacts</h2>
      <div>
        <form onSubmit={addNewPerson} className="flex flex-col gap-4">
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="number"
            value={number}
            onChange={handleNumberChange}
          />
          <button className="bg-blue-900 p-3 rounded-lg text-white text-lg uppercase">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
