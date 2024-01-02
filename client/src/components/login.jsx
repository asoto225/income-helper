import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            AuthService.login(data.login.token);
            <Navigate to="/dashboard" />
        } catch (e) {
            console.error(e);
        }

        setFormState({
            email: '',
            password: '',
        })
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit} >
                <div className="login-group">
                    <input
                        type="text"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                    />
                </div>
                <div className="login-group">
                    <input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="button-login btn">Login</button>
            </form>
            <div className="create-account">
                <p>Don't have an account? <br></br>
                    <Link to="/createAccount"> Create New Account</Link></p>
            </div>
            {error && <p className="error-message">Error: Email or Password is incorrect</p>}
        </div>
    )
}

export default Login;