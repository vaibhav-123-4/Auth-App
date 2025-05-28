"use client";
import React,{use, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();

  const[user, setUser] = React.useState({
    email: '',
    password: '',
   
  });
  const[buttonDisabled, setButtonDisabled] = React.useState(false);
  const[loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try{
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
     
      if(response.data.message === "Login successful") {
        alert("Login successful");
        router.push('/profile');
      } else {
        alert(response.data.message || "Login failed");
      }

    }
    catch(error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
    finally {
      setLoading(false);
    }
  }
useEffect(() => {
  if(user.email.length > 0 && user.password.length > 0) {
    setButtonDisabled(false);
  }
  else {
    setButtonDisabled(true);
  }
},[user]);

  return (
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <h1 className="text-3xl font-bold mb-4"> {buttonDisabled ? "Log In" : "Log In"}</h1>
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
      <button onClick={onLogin} className="bg-blue-500 text-white p-2 rounded" disabled={buttonDisabled || loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
      <Link href="/signup" className="text-blue-500 mt-4">
        Don't have an account? Sign up
      </Link>
    </div>
  )
}
