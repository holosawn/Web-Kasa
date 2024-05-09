import React, { useState, useEffect } from 'react';

const ShiftStatusContext = React.createContext(null);

const initialStatus = {
  isOpen: false,
  amount: 0,
  clockedOut: false,
};

// Helper function to save to session storage
const saveShiftStatusToSessionStorage = (shiftStatus) => {
  localStorage.setItem('shiftStatus', JSON.stringify(shiftStatus));
};

// Helper function to load from session storage
const loadShiftStatusFromSessionStorage = () => {
  const storedStatus = localStorage.getItem('shiftStatus');
  return storedStatus ? JSON.parse(storedStatus) : initialStatus;
};

export function ShiftStatusProvider({ children }) {
  // Use the loaded status from session storage or the provided initial status
  const [shiftStatus, setShiftStatus] = useState(loadShiftStatusFromSessionStorage());

  useEffect(() => {
    // Store the shiftStatus in session storage whenever it changes
    saveShiftStatusToSessionStorage(shiftStatus);
  }, [shiftStatus]); // Effect runs every time shiftStatus changes

  return (
    <ShiftStatusContext.Provider value={{ shiftStatus, setShiftStatus }}>
      {children}
    </ShiftStatusContext.Provider>
  );
}

export function useShiftStatus() {
  return React.useContext(ShiftStatusContext);
}
