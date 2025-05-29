'use client';
import axios from "axios";
import {useRouter} from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProfilePage() {

    const [data, setData] = useState(null);
    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 204) {
                alert("Logout successful");
                window.location.href = '/login'; // Redirect to login page
            } else {
                alert(response.data.message || "Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred during logout");
        }
    };

    const getUserDetails = async () => {
        try {
            const response = await axios.get('/api/users/me')
            

            if (response.status === 200) {
                // Handle successful response
                console.log("User details:", response.data);
            } else {
                // Handle error response
                console.error("Error fetching user details:", response.data);
            }

            setData(response.data.data._id);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
            <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
            <p className="text-white mb-4">This is the profile page.</p>
            <p className="text-white mb-4">You can add your profile details here.</p>
            <p className="text-white mb-4">This page is currently under construction.</p>
            <h2> {data === null ? "Nothing" : <Link href={`/profile/${data}`}>{data}View Profile</Link>}</h2>
            <button
                onClick={logout}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
                Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
            >
                Get User Details
            </button>
        </div>
    );
}