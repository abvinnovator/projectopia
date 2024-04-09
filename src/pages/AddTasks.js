import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './styles/task.css';

function AddTasks() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <div className="icons">
              <FaEdit onClick={() => handleEditTodo(todo.id, prompt('Edit Todo:', todo.text))} />
              <FaTrash onClick={() => handleDeleteTodo(todo.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddTasks;
