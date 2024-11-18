import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODONE: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Login failed.`);
    }
    
    return data;
  }
  catch (err) {
    console.error(`Error in login: ${err}`);
    return Promise.reject(`Unable to login at this time.`);
  }
};



export { login };
