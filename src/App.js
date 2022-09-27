import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState()
  const socket = io("http://localhost:8080", { transports: ["websocket"] });

  const onChangeHandler = (event) => {
    event.preventDefault();
    if (event.target.name === "username") {
      setUserData({ ...userData, username: event.target.value });
    }

    if (event.target.name === "password") {
      setUserData({ ...userData, password: event.target.value });
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/sign-in", userData)
      .then((response) => {
        console.log('sign in successful')

      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    socket.on('signedIn', data => {
      setUsername(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <h1>This is a react app {username ? username : null}</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(event) => onChangeHandler(event)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) => onChangeHandler(event)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
