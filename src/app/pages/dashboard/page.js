"use client";
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const Dashboard =  () => {
    let session = useSession();
    let res = JSON.stringify(session);
   
   
    return (
        <div className='mt-20'>
            This is DashBoard
           
            <p>{JSON.stringify(session)}</p>
           
          
          
            <button onClick={()=>signOut({callbackUrl:"/"})} class="btn btn-primary btn-sm">LOGOUT</button>
        </div>
    );
};

export default Dashboard;