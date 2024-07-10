import React, { useState } from 'react'
import { createContext } from 'react';

export const MyContext = createContext("");

const Context = ({ children }) => {

    const [user, setUser] = useState("");

    return (
        <>
            <MyContext.Provider value={{ user, setUser }}>
                {children}
            </MyContext.Provider>
        </>
    )
}

export default Context