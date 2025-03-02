"use client"

import Image from "next/image"
import { useEffect } from "react"

const PropertyTypes = () => {

    useEffect(()=> {

    },[])

  return (
    <div className="w-full mt-[4vh] px-[4%] overflow-x-auto  whitespace-nowrap flex gap-3 pb-2 scrollbar-hide" >
        <div className=" bg-[#CCEFEA] pt-28 relative rounded-lg ">
            <h1 className="absolute top-[6%] left-[8%] text-xl font-bold">Residential <br /> Apartments</h1>
            <span className="text-gray-600 absolute top-[30%] left-[8%] text-sm ">8200 + Properties</span>
            <Image src="/ap2.webp" className="rounded-lg" width={180} height={300} alt="Apartment"/>


        </div>
        
    </div>
  )
}

export default PropertyTypes