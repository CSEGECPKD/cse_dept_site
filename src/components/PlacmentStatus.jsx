'use client'
import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { MdKeyboardArrowDown ,MdKeyboardArrowUp } from "react-icons/md";
import { FaSquareFull } from "react-icons/fa6";



const ExpandableCards = ({title,year,item})=>{
  const [isExpanded, setIsExpanded] = useState(false);

;
  const toggleExpand = () => {
     if (!isExpanded) {
      setIsExpanded(true);
      
    } else {
      setIsExpanded(false);
    
      
    }
  };




  return (
    <div className='w-screen  flex  justify-center overflow-hidden'>
      
      <div onClick={toggleExpand} className={`group-first: w-[85%] flex flex-col justify-center transition-all duration-[1s] ease-in-out bg-[#E9E9E8] p-3 ${isExpanded?"mb-5":""} }`} style={{ fontFamily: 'Montserrat', fontSize: '24px', fontWeight: 500, lineHeight: '27.91px', color: '#9E9E9E', letterSpacing: '0.1em' }}>
        <div className='flex justify-between'>
          <div className={`font-bold transition-all duration-700 flex group-hover:text-black group-hover:text-2xl pl-5 ${isExpanded?"text-black text-2xl":"text-[#696969]"} cursor-pointer`} style={{ fontFamily: 'Bebas Neue', fontSize: '56px', fontWeight: 400, lineHeight: '67.2px', textAlign: 'center' }}>
            <FaSquareFull className={`translate-y-[19px] duration-1000 transition-all ${isExpanded?"text-[5px] mr-2 ":"text-[0px] mr-0 text-[#696969]"}`}/>{title}
          </div>
          <div onClick={toggleExpand} className={`transition-transform opacity-0 group-hover:opacity-100 cursor-pointer ${isExpanded?"rotate-180 opacity-100":''} duration-[1s] ease-in-out z-10`}>
            <MdKeyboardArrowDown className='w-10 h-8 text-[#9E9E9E]' />
          </div>
        </div>
        <div className={` transition-all duration-[1s] h-auto overflow-hidden  ${isExpanded?'opacity-100 max-h-screen':'opacity-0 max-h-0'} px-5`}>
          <div className='pb-2 pl-5 '>BTech &nbsp; Mtech &nbsp; Phd</div>
          <div className="flex justify-between">
            <div className='pb-2 pl-5 text-[#696969]'>Year &nbsp; 2027 &nbsp; Batch</div>
            <button className="w-[151.19px] h-[38px] py-2 px-4 text-white bg-[#696969]">Download</button>
          </div>
          <table className="w-full mt-5 border-black border-[1px] text-[#696969]">
            <thead className=' bg-[#E9E9E8]'>
              <tr >
                <th className="">SI NO</th>
                <th className="">COMPANY NAME</th>
                <th className="">NUMBER OF OFFER</th>
              </tr>
            </thead>
            <tbody className="py-2 px-4 text-[#696969] text-center">
              <tr>
                <td >1</td>
                <td >Company A</td>
                <td >5</td>
              </tr>
              <tr>
                <td >2</td>
                <td >Company B</td>
                <td >10</td>
              </tr>
              <tr>
                <td >3</td>
                <td >Company C</td>
                <td >8</td>
              </tr>
            </tbody>
          </table>
          {/* <div className="p-10 ">
            <div className="flex flex-row pb-10 border-b-2 border-black">
              <img src="./student-1.jpg" alt="" className='w-[500px] h-[280px]'/>
              <div className="pl-10">
              <div className="pb-4 border-b-2 border-black">
                <h1 className='text-black text-2xl font-medium font-montserrat leading-tight'>TECKSGLOBAL</h1>
                <p className='text-[#696969] text-xl font-normal font-montserrat pb-10'>Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....</p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex flex-row py-10">
                  <img src="./profile-logo.svg" alt="" className="self-start" />
                  <div className="pl-5 flex flex-col justify-between">
                    <h1 className='text-black text-xl font-normal font-montserrat '>Jane Doe</h1>
                    <h2 className='text-[#696969] text-base font-normal font-montserrat'>2025 Pass out Batch</h2>
                  </div>
                </div>
                <button className="w-[130.19px] h-[38px] py-2 px-4 text-white text-xl bg-[#696969] self-end">Read More</button>
              </div>
              </div>
            </div>
          </div> */}

          <div className='flex max-h-full'>
            <div className={`no-scrollbar flex flex-wrap flex-initial max-h-full  overflow-auto justify-center w-max transition-all duration-[1s] ease-in-out gap-3 `}>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}




function cardpeople() {



  return (
    <div className='flex flex-col justify-center items-center overflow-hidden'>
      <div className='w-min'>
        <ExpandableCards title="COMPANY WISE PLACEMENT"  />
        <ExpandableCards title="STUDENTS WISE PLACEMENT"  />
        <ExpandableCards title="STARTUPS/ENTREPRENEURSHIP" />
      </div>


     
    </div>
  )
}

export default cardpeople  

