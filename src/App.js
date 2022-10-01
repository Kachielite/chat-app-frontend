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


