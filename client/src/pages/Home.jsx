import React from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <Login />
      </div>
      <div>
        <p>Don't have an account? <br></br>
          <Link to="/createAccount"> Create New Account</Link></p>
      </div>
    </div>
  );
}