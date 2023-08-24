"use client"

import { Context } from "@/components/Client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const AddToDoForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const {user} = useContext(Context)

    const router = useRouter()

    const addTaskHandler = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post("/api/newtask", {
                title,description
            }, {headers: {"Content-Type": "application/json"}})
            toast(data.message)
            setTitle("")
            setDescription("")
            router.refresh()
        }catch(error){
            toast.error(error.response.data.message)
        }
    } 
    if(!user._id){
        return redirect("/login")
    }
    return (
        <div className="login">
            <section>
                <form onSubmit={addTaskHandler}>
                    <input required type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    <input required type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    <button type="submit">Add</button>
                </form>
            </section>
        </div>
    );
};

export default AddToDoForm;