import React from 'react'
import { prisma } from '@/libs/prisma'
import TaskCard from '@/components/TaskCard'

async function loadTasks(){
  // the back and the front are separate
  // const res = await fetch("http://localhost:3000/api/tasks")
  // const data = await res.json()
  return await prisma.task.findMany()
}

export const revalidate = 60;

async function Homepage() {
  const tasks = await loadTasks()
  return (
    <section className='container mx-auto'>
      <div className='grid grid-cols-3 gap-3 mt-10'>
        {tasks.map((task)=>(
          <TaskCard key={task.id} task={task}/>
      ))}
      </div>
    </section>
  )
}

export default Homepage
