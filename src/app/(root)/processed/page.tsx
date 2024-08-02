import React from 'react'

const page = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
         <h1 className='text-3xl text-yellow-400'> Hi This is processed page. </h1>
        </div> 
      </div>
    </div>
  )
}

export default page