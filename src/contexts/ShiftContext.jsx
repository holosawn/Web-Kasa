import React, { useState } from 'react'

const ShiftStatusContext = React.createContext(null);
const initialStatus = {
    isOpen : false,
    amount:0
}
export function ShiftStatusProvider({initialShiftStatus = initialStatus, children }){
    const [shiftStatus, setShiftStatus] = useState(initialShiftStatus);

    return(
        <ShiftStatusContext.Provider value={{'shiftStatus':shiftStatus, 'setShiftStatus':setShiftStatus}} >
            {children}
        </ShiftStatusContext.Provider>
    )

}

export function useShiftStatus(){
    return React.useContext(ShiftStatusContext)
}
