import ContactForm from "./components/ContactForm/ContactForm";
import initialContacts from "./contact.json";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { useState, useEffect } from "react";

function App() {
  const savedContacts =
    JSON.parse(localStorage.getItem("contacts")) || initialContacts;
  const [contacts, setContacts] = useState(savedContacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  const visibleContacts = contacts.filter((contact) => {
    const nameMatch =
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase());
    const numberMatch = contact.number && contact.number.includes(filter);

    return nameMatch || numberMatch;
  });

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={addContact} />
        <SearchBox value={filter} onFilter={setFilter} />
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      </div>
    </>
  );
}

export default App;
