import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const CreateAccount = () => {
    // define a useState hook for setting the formState object fields. Initialize the object fields with empty strings.
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        // goalExercise: '',
        // goalNutrition: '',
    });

    // define a useMutation hook for executing the ADD_USER mutation
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const [validationError, setValidationError] = useState('');

    // define a function to destructure the target element name and value from the event.target object and update the formState object accordingly.
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        setValidationError('');
    };

    // define an asnyc function to execute the mutation using the destructured formState object fields as arguments. Use the token in the returned data object as the argument in the Auth.login function, which stores the token to local storage and redirects the user to the home page.  
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password,
                    // goalExercise: parseInt(formState.goalExercise),
                    // goalNutrition: parseInt(formState.goalNutrition),
                 },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            if (e.message.includes('username')) {
                setValidationError('Username already taken!');
            } else if (e.message.includes('email')) {
                setValidationError('Email already exists!');
            }
            console.error(e);
        }
    };

    const styles = {
        errorMessage: {
            color: 'black',
            marginTop: 20,
            fontSize: 20,
            fontWeight: 'bold',
        },
    };

    return (
        <div id="create-account" className="home-container">
            <div className="signup-box">
                <h2>Create an Account</h2>
                <form onSubmit={handleFormSubmit}>
                    <input
                    className="form-group"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                    />
                    <input
                    className="form-group"
                    placeholder="Your email"
                    name="email"
                    type="text"
                    value={formState.email}
                    onChange={handleChange}
                    />
                    <input
                    className="form-group"
                    placeholder="Your password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    />
                    <button
                    className="login-button"
                    type="submit"
                    >
                        Create Account
                    </button>
                </form>
                {error && (
                    <div className='errorMessage' style={styles.errorMessage}>
                        {validationError}
                    </div>
                )}
                <div className="form-group">
                    <Link to="/" className="signup-button">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;