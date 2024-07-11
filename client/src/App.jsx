import { useContext, useEffect, useState } from 'react'
import io from "socket.io-client"
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MyContext } from './Context/Context';

export let globalSocket;

function App() {

  const { user } = useContext(MyContext)
  const [showHomePage, setShowHomePage] = useState(false)

  useEffect(() => {

    if (!user == "") {

      console.log("connecting to socket");

      // https://chat-4o4m.onrender.com
      // http://localhost:8080
      globalSocket = io("https://chat-4o4m.onrender.com", {
        query: {
          userName: user
        }

      });

      if (globalSocket) {
        setShowHomePage(true);
      }

    }

  }, [user])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage showHomePage={showHomePage} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
