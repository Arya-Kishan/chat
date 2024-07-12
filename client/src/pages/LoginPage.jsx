import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/Context';
import cute from '../assets/cute5.png'
import { toast } from 'react-toastify';

const LoginPage = () => {

    const inputRef1 = useRef("");
    const inputRef2 = useRef("");
    const navigate = useNavigate();
    const { user, setUser } = useContext(MyContext)

    const handleLogin = async () => {

        console.log(inputRef1.current.value?.length);

        if (inputRef1.current.value?.length <= 0) {
            toast("write your name")
        } else if (inputRef2.current.value?.length <= 0) {
            toast("write password")
        } else {

            setUser(inputRef1.current.value);
            if (inputRef2.current.value == "arya") {
                navigate("/home")
            } else {
                toast("wrong password")
            }

        }

    }

    const handleUp = (e) => {
        if (e.key == "Enter") {
            handleLogin();
        }
    }

    return (
        <div className='w-full h-dvh flex flex-col justify-center items-center'>

            <div className='w-[90%] lg:w-[70%] flex flex-col justify-center items-center gap-5 pb-[100px]'>
                <img className='w-[150px]' src={cute} alt="" srcSet="" />
                <input className='w-full border-2 p-2 rounded-md' ref={inputRef1} type="text" placeholder='Name...' />
                <input onKeyUp={handleUp} className='w-full border-2 p-2 rounded-md' ref={inputRef2} type="text" placeholder='Password...' />
                <button className='w-full bg-teal-500 shadow-lg p-2 rounded-md' onClick={handleLogin}>JOIN</button>
            </div>

        </div>
    )
}

export default LoginPage