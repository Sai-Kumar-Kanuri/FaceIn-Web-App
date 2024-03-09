import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/context";
import Posts from "./pages/posts/Posts";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import { Button } from "./components/ui/button";

export default function App() {

  const { authUser } = useAuthContext();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={authUser ? <Posts /> : <Home />} />
        <Route path="/signup" element={authUser ? <Posts /> : <Home />} />
        <Route path="/" element={authUser ? <Posts /> : <Home />} />
      </Routes>
      <Toaster />
    </div>
  )
}