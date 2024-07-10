import { useContext, useEffect, useState } from 'react'
import io from "socket.io-client"
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MyContext } from './Context/Context';

export let globalSocket;

function App() {

  const { user, setUser } = useContext(MyContext)
  console.log(user);
  console.log(globalSocket);

  useEffect(() => {

    if (!user == "") {

      console.log("connecting to socket");

      globalSocket = io("http://localhost:8080", {
        query: {
          userName: user
        }

      });

    }

    console.log(globalSocket);

  }, [user])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          {!user == "" && <Route path='/home' element={<HomePage />} />}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
