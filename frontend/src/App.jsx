import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home"
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/Signup";



function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
