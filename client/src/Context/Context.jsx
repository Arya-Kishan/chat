import React, { useState } from 'react'
import { createContext } from 'react';

export const MyContext = createContext("");

const Context = ({ children }) => {

    const [user, setUser] = useState("");
    const [onlineUser, setOnlineUser] = useState([]);

    return (
        <>
            <MyContext.Provider value={{ user, setUser, onlineUser, setOnlineUser }}>
                {children}
            </MyContext.Provider>
        </>
    )
}

export default Context