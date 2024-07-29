import axios from "axios";
import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(null);

// Function to encapsulate functionality of getting data from localstorage
const getLocalStorageItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return (item === null || item === 'undefined' || item === undefined) ? defaultValue : JSON.parse(item);
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children})=>{
  // token and user state to check if user is authorized, user and token set to null when its not authorized
  const [token, setToken] = useState(getLocalStorageItem('clientAccessToken', null))
  const [user, setUser] = useState(getLocalStorageItem('user', null))
  const location = useLocation()

  // updating state and localStorage together
  const updateToken = (updater) => {
    setToken((prevToken) => {
      const newToken = typeof updater === 'function' ? updater(prevToken) : updater;
      localStorage.setItem('clientAccessToken', JSON.stringify(newToken));
      return newToken;
    });
  };

  // updating state and localStorage together
  const updateUser = (updater) => {
    setUser((prevUser) => {
      const newUser = typeof updater === 'function' ? updater(prevUser) : updater;
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  };

  // login user and set access token and user 
  const login = async (userCode, password) => {
    try {
      const response = await axios.post('/auth/login', { userCode, password }, { headers: { 'Content-Type': 'application/json' } });
      updateToken(response.data.accessToken);
      updateUser(response.data.user);
      return true;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Invalid credentials');
      } else {
        console.error('An error occurred during login', error);
      }
      return false;
    }
  };

  const logout = () => {
    updateToken(null);
    updateUser(null);
    localStorage.setItem('clientAccessToken', JSON.stringify(null))
  };

  // creating an interceptor to add access token to header of every request
  // We use useLayoutEffect because we want to run this before any request made
  useLayoutEffect( () => {
    const authInterceptor = axios.interceptors.request.use((config) => {
        config.headers.authorization = 
        // _retry property is for checking if access token is expired and an attemp to refresh it is already made
            !config._retry && token 
                ? token
                : config.headers.authorization;
        return config  
    })

        // Clean up function to clear interceptor
        return () => {
            axios.interceptors.request.eject(authInterceptor)
        }
  }, [token])  

  // creating an interceptor to every response to refresh access token if its expired
  // We use useLayoutEffect because we want to run this before any request made
  useLayoutEffect( () => {
    const refreshInterceptor = axios.interceptors.response.use(
        (response) => response, 
        async (error) => {
            const originalRequest = error.config;

            // console.log(error.response.status, error.response.data, location.pathname);
            // console.log(error.response.status === 403, error.response.data === 'Token Expired', location.pathname != '/Login');

            if (error.response.status === 403 &&
                error.response.data === 'Token Expired' &&
                location.pathname != "/login" 
            ) 
            {
              axios.get('/auth/refresh' , {headers: {'authorization' : token}})
              .then( (res) => {
                  updateToken(res.headers.authorization)
                  originalRequest.headers.authorization = res.headers.authorization
                  // Setting the _retry property to true
                  originalRequest._retry = true

                  axios.request(originalRequest)
              })
              .catch(err => {
                // console.log('interceptor', err);
                  updateToken(null)
                  updateUser(null)
              })
            }

            return Promise.reject(error)
        }
    )
    
    return () => {
        axios.interceptors.response.eject(refreshInterceptor)
    }
  } , [])

  // authorization attempt on first mount
  useEffect(() => {
    const fetchMe = async () => {
        try {
            await axios.get('/auth/me',  {headers: {'authorization' : token} })
            .then( res => {
                updateUser(res.data)
                updateToken(res.headers.authorization)
            })
        } catch (error) {
          if (!error.response.data === 'Token Expired') {
            updateToken(null)
            updateUser(null)
          }
        }
    }

    fetchMe()
  }, [])

    return (
        <AuthContext.Provider value={{loggedIn: token ? true : false, user, login, logout}}>
          {children}
        </AuthContext.Provider>
      );

    };

