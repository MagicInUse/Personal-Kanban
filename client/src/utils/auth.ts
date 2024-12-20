import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // TODONE: return the decoded token
    try {
      const token = this.getToken();
      if (token) {
        const decoded = jwtDecode<UserData>(token);
        return decoded;
      }
    }
    catch (error) {
      console.error(`Failed to get profile: ${error}`);
      return null;
    }
    return null;
  }

  loggedIn() {
    // TODONE: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  handleInvalidToken() {
    // Prevent infinite redirects by checking if already on the home page
    if (window.location.pathname !== '/') {
      // Redirect to the home page
      window.location.assign('/');
    }
  }
  
  isTokenExpired(token: string) {
    // TODONE: return a value that indicates if the token is expired
    try {
      // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type.
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the decodeed token has an 'exp' (expiration) property and if it is less than the current time in seconds.
      if (decoded?.exp && decoded?.exp * 1000 < Date.now()) {
        // If the token is expired, return true
        this.handleInvalidToken();
        return true;
      }
    }
    catch (error) {
      // If there is an error decoding the token, return false
      this.handleInvalidToken();
      return true;
    }
    return false;
  }

  getToken(): string {
    // TODONE: return the token
    try {
      // Attempt to get the token from localStorage
      const loggedUser = localStorage.getItem('idToken');
      // If the token is not null, return it
      if (loggedUser) {
        return loggedUser;
      }
    }
    catch (error) {
      // If there is an error, return an empty string
      console.error('Failed to get token from localStorage:', error);
      return '';
    }
    return '';
  }

  login(idToken: string) {
    // TODONE: set the token to localStorage
    localStorage.setItem('idToken', idToken);
    // TODONE: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODONE: remove the token from localStorage
    localStorage.removeItem('idToken');
    // TODONE: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
