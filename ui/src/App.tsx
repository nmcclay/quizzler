import React, { useState, useEffect } from "react";
import './App.css';
import Quiz from './Quiz';
import Players from "./Players";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

function App() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("connect", () => {
            console.log('connected!');
            setResponse('Yep!');
        });

        socket.on("disconnect", () => {
            console.log('disconnected!');
            setResponse('Nope!');
        });

        socket.on("buzzers", (status) => {
            console.log('Buzzer Status:', status.connected);
        });
    }, []);

    return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className="App-body">
        <Quiz></Quiz>
          <p>
              It's connected: {response}
          </p>
      </main>
      <footer className="App-footer">
          <Players/>
      </footer>
    </div>
    );
}

export default App;
