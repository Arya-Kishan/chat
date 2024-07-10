import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/Context';
import cute from '../assets/cute5.png'

const LoginPage = () => {

    const inputRef1 = useRef("");
    const inputRef2 = useRef("");
    const navigate = useNavigate();
    const { user, setUser } = useContext(MyContext)

    const handleLogin = async () => {
        setUser(inputRef1.current.value);
        if (inputRef2.current.value == "as") {
            navigate("/home")
        }
    }

    return (
        <div className='w-full h-dvh flex flex-col justify-center items-center'>

            <div className='w-[100%] lg:w-[70%] flex flex-col justify-center items-center gap-5 pb-[100px]'>
                <img className='w-[150px]' src={cute} alt="" srcSet="" />
                <input className='w-full border-2 p-2 rounded-md' ref={inputRef1} type="text" placeholder='Name...' />
                <input className='w-full border-2 p-2 rounded-md' ref={inputRef2} type="text" placeholder='Password...' />
                <button className='w-full bg-teal-500 shadow-lg p-2 rounded-md' onClick={handleLogin}>JOIN</button>
            </div>

        </div>
    )
}

export default LoginPage