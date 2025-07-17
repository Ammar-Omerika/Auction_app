import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Could not load profile");
      }
    };

    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <p>Please log in to view your profile.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
    <Navbar/>
    <div>
      <h1>Welcome, {profile.firstname} {profile.lastname}!</h1>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
      <p>This is the profile page</p>
    </div>
    </>
  );
}

export default Profile;
