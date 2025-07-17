import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <>
    <Navbar/>
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
    </>
  );
};

export default NotFound;
