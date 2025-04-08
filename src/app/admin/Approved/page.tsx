import React from 'react'
import Document from './Document'
import Application from './Application'
const page = () => {
  return (

<div className="flex gap-4 p-4 max-lg:flex-col">
     
      <div className="w-[70%] max-lg:w-full mx-auto h-full ">
      <Document/>
      </div>     
      <div className="w-[30%] max-lg:w-full mx-auto">
      <Application/>
      </div>
    </div>

  )
}

export default page
