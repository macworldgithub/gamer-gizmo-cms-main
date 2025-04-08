import React from 'react'
import OrderHistory from './OrderHistory'
import SalesSummary from './sammary'
import profile from "../../../../public/Profile image.png"
import Image from 'next/image'
const page = () => {
  return (
    <>
    <div className="flex gap-2 px-4 py-4">
        <div className=''>
          <Image 
          src={profile}
          alt="profile"
          width={45}
          height={45}
          />
          </div>
          <div className="font-bold text-xl mt-3">
        Michel Smith
        </div>
        </div>
    <div>
    <SalesSummary/>
     <OrderHistory/>
    </div>
    </>
  )
}

export default page