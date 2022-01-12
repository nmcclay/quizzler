import React from 'react';
import './App.css';
import Quiz from './Quiz';
import Players from "./Players";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className="App-body">
        <Quiz></Quiz>
      </main>
      <footer className="App-footer">
          <Players></Players>
      </footer>
    </div>
  );
}

export default App;
