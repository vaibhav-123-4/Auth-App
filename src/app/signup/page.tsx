"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {
  const router = useRouter();

  const[user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const[loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try{
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      alert(response.data.message);
      router.push('/login');
    }
    catch(err) {
      console.error("Error during signup:", err);
      alert("An error occurred during signup. Please try again.");
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <label htmlFor='username' className="text-white mb-2">Username:</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="mb-4 p-2 border border-gray-300 rounded w-64"
      />
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
      <button onClick={onSignup} className="bg-blue-500 text-white p-2 rounded">
        {buttonDisabled ? 'Signing Up...' : 'Sign Up'}
      </button>
      <Link href="/login" className="text-blue-500 mt-4">
        Already have an account? Log in
      </Link>
    </div>
  )
}

