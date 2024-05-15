import ContactForm from "./components/ContactForm/ContactForm";
import initialTasks from "./tasks.json";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { useState, useEffect } from "react";

function App() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || initialTasks;
  const [tasks, setTasks] = useState(savedTasks);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };

  const visibleTasks = tasks.filter((task) => {
    const nameMatch =
      task.name && task.name.toLowerCase().includes(filter.toLowerCase());
    const numberMatch = task.number && task.number.includes(filter);

    return nameMatch || numberMatch;
  });

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={addTask} />
        <SearchBox value={filter} onFilter={setFilter} />
        <ContactList tasks={visibleTasks} onDelete={deleteTask} />
      </div>
    </>
  );
}

export default App;
