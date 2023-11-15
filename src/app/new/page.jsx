"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

function Newpage({params}) {

    const router = useRouter()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    useEffect(()=>{
        fetch(`/api/tasks/${params.id}`)
            .then((res)=>res.json())
            .then((data)=>{
                setTitle(data.title)
                setDescription(data.description)
            })
    },[])

    const  onSubmit = async (e) =>{
        e.preventDefault()

        if(params.id){
            const res = await fetch(`/api/tasks/${params.id}`,{
                method: 'PUT',
                body: JSON.stringify({title, description}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            console.log(data)
        }else{
            const res = await fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify({title, description}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            console.log(data)

        }
        router.refresh()
        return router.push('/')
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        <form
            onSubmit={onSubmit}
        className='bg-slate-800 p-10 w-1/4'>
            <label htmlFor='title'>Title</label>
            <input
            type="text"
            id="title"
            className='border border-gray-400 p-2 mb-4 w-full text-black'
            placeholder='title'
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            />
            <label htmlFor='description'>Description</label>
            <textarea
            rows="3"
            className='border border-gray-400 p-2 mb-4 w-full text-black'
            id="description"
            placeholder='description'
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
            ></textarea>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'> Create</button>
            {params.id &&
            <button type='button'
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-4 rounded'
            onClick={async () => {
                const res = await fetch(`/api/tasks/${params.id}`,{
                    method: 'DELETE'
                })
                router.refresh()
                router.push('/')
            }}
            > Delete</button>}

        </form>
    </div>
  )
}

export default Newpage