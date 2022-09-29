import { Route, Routes } from "react-router-dom";
import ChatScreen from "./pages/ChatScreen";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import './App.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </div>
  );
};

export default App;

// import axios from "axios";
// import React from "react";
// import { useState, useEffect } from "react";

// const io = require('socket.io-client');
// const socket = io("http://localhost:8080", { transports: ["websocket"] });

// function App() {
//   const [userData, setUserData] = useState({});
//   const [username, setUsername] = useState()

//   const onChangeHandler = (event) => {
//     event.preventDefault();
//     if (event.target.name === "username") {
//       setUserData({ ...userData, username: event.target.value });
//     }

//     if (event.target.name === "password") {
//       setUserData({ ...userData, password: event.target.value });
//     }
//   };

//   const onSubmitHandler = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:8080/api/v1/sign-in", userData)
//       .then((response) => {
//         console.log('sign in successful')
//         socket.on('signedIn', data => {
//           console.log(data.message)
//         })
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   };

//   const logOutHandler = () =>{
//     socket.disconnect()
//   }

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log(socket)
//       console.log(socket.id);
//     });
//     socket.on("disconnect", (reason) => {
//       if(socket.id === false){
//         socket.emit('signedOut', 'user signed out')
//       }
//       console.log(reason)
//     });
//   })

//   return (
//     <div className="App">
//       <h1>This is a react app {username ? username : null}</h1>
//       <form onSubmit={onSubmitHandler}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             name="username"
//             id="username"
//             onChange={(event) => onChangeHandler(event)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             onChange={(event) => onChangeHandler(event)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <button onClick={logOutHandler}>Logout</button>
//     </div>
//   );
// }

// export default App;
