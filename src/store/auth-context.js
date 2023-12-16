import React, { useState } from 'react'

const AuthContext = React.createContext()

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)

    const userIsLoggedIn = !!token;  
    // The use of two exclamation marks (!!) is a common pattern to convert a value to its boolean equivalent. The first ! negates the truthiness, and the second ! negates that result, effectively converting the value to its boolean representation.
    // Here's what happens:
    // If token has a truthy value (e.g., a non-empty string, object, or number), the first ! turns it into false, and the second ! turns it back to true. So, userIsLoggedIn will be true.
    // If token is falsy (e.g., null, undefined, an empty string, or false), the first ! turns it into true, and the second ! turns it back to false. So, userIsLoggedIn will be false.

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const contextValue = {
        token: token,
        isLoggedIn : userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;