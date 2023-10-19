import { useState, useEffect } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Message from "./components/Message";
import server from "./services/server";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [errorType, setErrorType] = useState(null);
  const [message, setMessage] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    server.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);
  return (
    <div>
      <Header />

      <Form
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setErrorType={setErrorType}
      />
      <Message errorType={errorType} message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2 className="text-center text-lg uppercase mb-3">My Contacts</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setErrorType={setErrorType}
        filter={filter}
      />
    </div>
  );
}
