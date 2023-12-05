// This file configures the client side portion of JWT authentication
import decode from 'jwt-decode';

// Define class to contain methods for handling JWT authentication
class AuthService {

    // Decode the JWT token pulled from local storage and return the decoded data
    getProfile() {
        return decode(this.getToken());
    }

    // Return the logged in status by checking if the token exists and has not expired.
    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }

    // Check if the token is expired by comparing the exp key value (in seconds) to the Date.now() value (in milliseconds). If expired, remove the token from local storage and return true.
    isTokenExpired(token) {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true;
        }
        return false;
    }

    // Return the token from local storage.
    getToken() {
        return localStorage.getItem('id_token');
    }

    // Store a given JWT token to local storage and redirect the user to the root URL. This function is used in the login submit process to store the token returned from the LOGIN_USER mutation.
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/dashboard');
    }

    // Remove the JWT token from local storage and reload the page.
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();