"use client"
import React, {useContext, useEffect, useState} from 'react';
import Link from "next/link";
import axios from "axios";
import {toast} from "react-toastify";
import { Context } from '@/components/Client';
import { redirect } from 'next/navigation'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {user, setUser} = useContext(Context)

    const loginHandler = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post("/api/login", {email, password}, {headers: {
                "Content-Type": "application/json"
            }})
            await toast(data.message)
            setUser(data.user)
        }catch(error){
            toast.error(error.response.data.message)
        }
    }

    if(user._id){
        return redirect("/")
    }

    return (
        <div className="login">
            <section>
                <form onSubmit={loginHandler}>
                    <input required type="email" placeholder="Enter Your Email Id" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input required type="password" placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                    <Link href={"/register"}>New User</Link>
                </form>
            </section>
        </div>
    );
};
export default Login;