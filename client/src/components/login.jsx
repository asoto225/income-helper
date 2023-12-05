import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { Navigate } from "react-router-dom";

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
            <div>
                <h2>Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="login-container"></div>
                    <input
                        type="text"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    <button className="button-login">Login</button>

                </form>
                {error && <p>Error: {error.message}</p>}
            </div>
        )
    }

    export default Login;