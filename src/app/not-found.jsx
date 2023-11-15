import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <section className='flex h-[calc(100vh-7rem)] justify-center items-center'>
        <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>NotFound</h1>
            <Link href="/">
                Go back home
            </Link>
        </div>
    </section>
  )
}

export default NotFound