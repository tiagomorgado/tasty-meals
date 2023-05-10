import React, { useContext, useEffect } from "react";

const AppContext = React.createContext()

/* Context API to prevent Prop drilling */
const AppProvider = ({children}) => {
    useEffect(() => {
        console.log('Fetch Data Here')
    },[])
    return <AppContext.Provider value='hello'>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}