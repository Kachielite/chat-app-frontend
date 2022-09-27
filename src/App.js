import React from "react";
import {useEffect} from "react";
import openSocket from "socket.io-client"

function App() {

  useEffect(() =>{
    openSocket('http://localhost:8080',{ transports: ["websocket"] })
  })

  return (
    <div className="App">
      <p>This is a react app</p>
    </div>
  );
}

export default App;
