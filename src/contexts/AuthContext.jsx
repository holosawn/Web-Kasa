import axios from "axios";
import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const getLocalStorageItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return (item === null || item === 'undefined' || item === undefined) ? defaultValue : JSON.parse(item);
};

export const AuthProvider = ({children})=>{
  const [token, setToken] = useState(getLocalStorageItem('clientAccessToken', null))
  const [user, setUser] = useState(getLocalStorageItem('user', null))
  const location = useLocation()


  const updateToken = (updater) => {
    setToken((prevToken) => {
      const newToken = typeof updater === 'function' ? updater(prevToken) : updater;
      localStorage.setItem('clientAccessToken', JSON.stringify(newToken));
      return newToken;
    });
  };
  
  const updateUser = (updater) => {
    setUser((prevUser) => {
      const newUser = typeof updater === 'function' ? updater(prevUser) : updater;
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  };

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
    updateUser(null)
  };

  // Try to get this out of useLayoutEffect
  useLayoutEffect( () => {
    const authInterceptor = axios.interceptors.request.use((config) => {
        config.headers.authorization = 
            !config._retry && token 
                ? token
                : config.headers.authorization;
        return config  
    })

        return () => {
            axios.interceptors.request.eject(authInterceptor)
        }
  }, [token])

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
                  originalRequest._retry = true

                  axios.request(originalRequest)
              })
              .catch(err => {
                console.log('interceptor', err);
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

