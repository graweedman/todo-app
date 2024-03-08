import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbarComponent';
import TodoForm from './components/todo/todoFormComponent';
import TodoList from './components/todo/todoListComponent';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className='container'>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
