"use client"
import React, { useContext, useState } from 'react';
import Link from "next/link";
import { Context } from '@/components/Client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {user, setUser} = useContext(Context)

    const registerHandler = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post("/api/register", {
                name,email,password
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast(data.message)
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
                <form onSubmit={registerHandler}>
                    <input required type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input required type="email" placeholder="Enter Your Email Id" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input required type="password" placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">Register</button>
                    <Link href={"/login"}>Login</Link>
                </form>
            </section>
        </div>
    );
};
export default Register;