import React, { useContext, useEffect, useRef, useState } from 'react'
import uniqId from 'uniqid';
import cute1 from '../assets/cute1.png'
import cute2 from '../assets/cute2.png'
import cute3 from '../assets/cute3.png'
import cute4 from '../assets/cute4.png'
import cute5 from '../assets/cute5.png'
import send from '../assets/send.svg'
import { MyContext } from '../Context/Context';
import { globalSocket } from '../App';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HomePage = ({ showHomePage }) => {

    const inputRef = useRef("");
    const chatBoxRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [showOnline, setShowOnline] = useState(false);
    const { user, setUser, onlineUser, setOnlineUser } = useContext(MyContext)

    const handleSend = async () => {
        let message = { id: uniqId(), user: user, message: inputRef.current.value }
        setMessages([...messages, message])
        globalSocket?.emit("send_message", message)
        inputRef.current.value = ""
    }

    const handleUp = (e) => {
        if (e.key == "Enter") {
            handleSend();
        }
    }

    useEffect(() => {

        globalSocket?.on("receive_message", (val) => {
            console.log(val);
            setMessages(prev => [...prev, val])
        })

        globalSocket?.on("onlineUsers", (val) => {
            setOnlineUser(val)
        })

        globalSocket?.on("joined", (val) => {
            toast(`${val} joined`)
        })

        globalSocket?.on("left", (val) => {
            toast(`${val} left`)
        })

        globalSocket?.on("delete", (val) => {
            setMessages([])
        })

        return () => globalSocket?.off("receive_message");

    }, [globalSocket])

    useEffect(() => {
        chatBoxRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const handleDelete = () =>{
        globalSocket?.emit("delete","all _messages")
    }

    console.log(showOnline);


    return (
        <div className='w-full h-dvh relative overflow-hidden flex flex-col'>

            {user == "" && <Navigate to={"/"} />}

            {showHomePage ? <>
                <div className='w-full h-[56px] flex justify-between items-center bg-teal-600 p-2'>
                    <img className='w-[40px]' src="https://api.multiavatar.com/Starcrasher.svg" alt="" srcSet="" />
                    <span onClick={() => setShowOnline(true)} className='font-semibold pr-4 capitalize'>online</span>
                </div>

                <div className='w-full h-full flex flex-col gap-3 z-10 p-2 overflow-scroll'>
                    {messages?.map((e, i) => (<div key={e.id} className={`w-full flex ${e.user == user ? 'justify-end' : 'justify-start'} z-10`}>
                        <p ref={chatBoxRef} className='w-[50%] p-2 rounded-lg bg-teal-300'>{e.message}</p>
                    </div>))}
                </div>

                <div className='w-full h-[56px] flex justify-center items-centerp-2 bg-[#01012A]'>

                    <div className='w-[98%] flex justify-center rounded-lg mb-1'>
                        <input onKeyUp={handleUp} className='w-full  rounded-lg p-1' ref={inputRef} type="text" placeholder='Write your message ....' />
                        <img onClick={() => handleSend()} className='w-[30px] p-1' src={send} alt="" srcset="" />
                    </div>

                </div>

                <img className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[200px] z-5 opacity-[0.1]' src={cute1} alt="" srcSet="" />
            </> : <div className='w-full h-dvh flex justify-center items-center'>Loading...</div>}

            {showOnline && <div onClick={() => setShowOnline(false)} className='w-full h-dvh fixed top-0 left-0 flex justify-center items-center bg-gradient-to-t from-black z-30'>
                <div onClick={(e) => e.stopPropagation()} className='w-[70%] h-[50%] flex flex-col gap-2 overflow-scroll bg-teal-500 rounded-lg p-2 relative'>
                    {onlineUser?.map((e, i) => (<p className='capitalize font-medium'>{i + 1}.  {e}</p>))}
                    <button onClick={()=>handleDelete()} className='absolute bottom-2 right-3 p-2 text-[14px] bg-red-700 text-white rounded-lg'>Delete messages</button>
                </div>
            </div>}


        </div>
    )
}

export default HomePage