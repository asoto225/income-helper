import React from "react";
import Login from "../components/Login";

export default function Home() {
  return (
    <div>
      <div className="welcome-message">
        <h2>Welcome to <strong>Spender Sense!</strong></h2>
        <p>
          Trouble with your budget? Take control of your finances and manage your monthly expenses
          effortlessly.
          Log in to your account and start your journey towards financial
          freedom today!
        </p>
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
}