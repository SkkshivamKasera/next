"use client";
import {useState, createContext, useContext, useEffect} from "react";
import Link from "next/link";
import {toast} from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export const Context = createContext({user: {}})
export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch("/api/me", {method: "GET"}).then((res)=>res.json()).then(data=>{
            if(data.success){
                setUser(data.user)
            }
        })
    })
    return <Context.Provider value={{
        user,
        setUser
    }}>
        {children}
    </Context.Provider>
}
export const LogOutBtn = () => {
    const {user, setUser} = useContext(Context)
    const logoutHandler = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.get("/api/logout")
            toast(data.message)
            setUser({})
        }catch(error){
            toast.error(error.message)
        }
    }
    
    return (
        user._id ? <button className='btn' onClick={logoutHandler}>LogOut</button> : <Link href='/login'>Login</Link>
    )
}

export const ToDoButton = ({id, completed}) => {
    const router = useRouter()
    const deleteHandler = async (id) => {
        try{
            const {data} = await axios.delete(`/api/deletetask?id=${id}`)
            toast(data.message)
        }catch(error){
            toast.error(error.response.data.message)
        }
    }
    const updateHandler = async (id) => {
        try{
            const {data} = await axios.get(`/api/updatetask?id=${id}`)
            toast(data.message)
            router.refresh()
        }catch(error){
            toast.error(error.response.data.message)
        }
    }
    return <>
        <input type={"checkbox"} checked={completed} onChange={()=>updateHandler(id)}/>
        <button className={"btn"} onClick={()=>deleteHandler(id)}>Delete</button>
    </>
}