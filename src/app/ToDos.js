import { ToDoItem } from '@/components/ServerComponent'
import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const fetchToDo = async (token) => {
    try{
      const {data} = await axios.get(`${process.env.UR}/api/mytasks`, {
        cache: "no-cache",
        headers: {
          cookie: `token=${token}`
        }
      })
      return data.tasks
    }catch(error){
      return []
    }
  }

const ToDos = async () => {
    const cookieData = cookies().get("token")
    if(!cookieData) return redirect("/login")
    const token = cookieData.value
    const tasks = await fetchToDo(token)
    return (
      <section className="todosContainer">
            {
              tasks && tasks.map((i) => (
                <ToDoItem key={i._id} title={i.title} description={i.description} id={i._id} completed={i.isCompleted}/>
              ))
            }
        </section>
    )
}

export default ToDos
