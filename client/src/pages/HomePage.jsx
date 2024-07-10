import React, { useContext, useEffect, useRef, useState } from 'react'
import uniqId from 'uniqid';
import cute1 from '../assets/cute1.png'
import cute2 from '../assets/cute2.png'
import cute3 from '../assets/cute3.png'
import cute4 from '../assets/cute4.png'
import cute5 from '../assets/cute5.png'
import { MyContext } from '../Context/Context';
import { globalSocket } from '../App';
import { Navigate } from 'react-router-dom';

const HomePage = () => {

    const inputRef = useRef("");
    const chatBoxRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const { user, setUser } = useContext(MyContext)
    console.log(globalSocket);

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

        return () => globalSocket?.off("receive_message");

    }, [globalSocket])

    useEffect(() => {
        chatBoxRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])


    return (
        <div className='w-full h-dvh relative overflow-hidden flex flex-col'>

            {user == "" && <Navigate to={"/"} />}

            {!globalSocket ? <>
                <div className='w-full h-[56px] flex justify-between items-center bg-teal-600 p-2'>
                    <img className='w-[40px]' src="https://api.multiavatar.com/Starcrasher.svg" alt="" srcset="" />
                    <span className='font-semibold pr-4 capitalize'>{user}</span>
                </div>

                <div className='w-full h-full flex flex-col gap-3 z-10 p-2 overflow-scroll'>
                    {messages?.map((e, i) => (<div key={e.id} className={`w-full flex ${e.user == user ? 'justify-end' : 'justify-start'} z-10`}>
                        <p ref={chatBoxRef} className='w-[50%] p-2 rounded-lg bg-teal-300'>{e.message}</p>
                    </div>))}
                </div>

                <div className='w-full h-[56px] flex justify-center items-centerp-2 bg-[#01012A]'>

                    <div className='w-[98%] flex justify-center rounded-lg'>
                        <input onKeyUp={handleUp} className='w-full  rounded-l-lg' ref={inputRef} type="text" />
                        <button className='w-[10%] bg-teal-400 p-2  rounded-r-lg' onClick={() => handleSend()}>Send</button>
                    </div>

                </div>

                <img className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[200px] z-5 opacity-[0.1]' src={cute1} alt="" srcSet="" />
            </> : <div className='w-full h-dvh flex justify-center items-center'>Loading...</div>}


        </div>
    )
}

export default HomePage