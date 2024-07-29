import React, { useState } from 'react'

const useSessionStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        // console.log(sessionStorage.getItem(key) === "undefined" ? key : sessionStorage.getItem(key));
        const storedValue = JSON.parse(sessionStorage.getItem(key));
        return storedValue ? storedValue : initialValue;
    });

    // function to update value in sessionStorage on every state change
    // It will be passed instead of setState function
    const updateValue = (input) =>{
        setValue(prev => {
            if (typeof input === 'function') {
                sessionStorage.setItem(key, JSON.stringify(input(prev)))
                return input(prev)
            }
            else{
                sessionStorage.setItem(key, JSON.stringify(input))
                return input
            }
        })
    }
    
      return [value, updateValue];
}

export default useSessionStorage
