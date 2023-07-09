'use client'
import Link from "next/link";
import React from "react";
export default function LoginFace() {


  
  return (
    <>
       <div className="flex justify-center"><div className='bg-red-800 flex p-2 w-1/2 mt-2 text-center items-center justify-center rounded-full text-white hover:cursor-pointer' onClick={()=>window.location.href='/'}>Accept FaceID</div></div>

    <div className="body" id='faceDiv' name='faceDiv'>
       <video id="video" width="720" height="560" autoPlay muted></video>
     </div>
    </>
  );
}