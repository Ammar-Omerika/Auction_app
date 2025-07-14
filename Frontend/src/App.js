import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Titlebar from "./components/Titlebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound"; 
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from "./components/Footer";
import Shop from "./pages/Shop"; 


function App() {
  return (
    <Router>
      <Titlebar/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
