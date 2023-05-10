import React, { useContext } from "react";

const AppContext = React.createContext()

/* Context API to prevent Prop drilling */
const AppProvider = ({children}) => {
    return <AppContext.Provider value='hello'>
        {children}
    </AppContext.Provider>
}

export {AppContext, AppProvider}