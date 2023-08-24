"use client"
import { Context } from '@/components/Client';
import { redirect } from 'next/navigation';
import React, { useContext } from 'react';

const About = () => {
    const {user} = useContext(Context)
    if(!user._id) return redirect("/login")
    return (
        <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100vw', height: '100vh', maxWidth: '100%', position: 'fixed'}}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
};

export default About;