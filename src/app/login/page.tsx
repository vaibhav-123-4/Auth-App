"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {

  const[user, setUser] = React.useState({
    email: '',
    password: '',
   
  });
  const onLogin = async () => {
  }
  return (
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <h1 className="text-3xl font-bold mb-4">Log In</h1>
      <label htmlFor='email' className="text-white mb-2">Email:</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="mb-4 p-2 border border-gray-300 rounded w-64"
      />
      
      <label htmlFor='password' className="text-white mb-2">Password:</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="mb-4 p-2 border border-gray-300 rounded w-64"
      />
      <button onClick={onLogin} className="bg-blue-500 text-white p-2 rounded">
        Log In
      </button>
      <Link href="/signup" className="text-blue-500 mt-4">
        Don't have an account? Sign up
      </Link>
    </div>
  )
}
