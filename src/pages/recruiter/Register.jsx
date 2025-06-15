import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate=useNavigate();
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const[confirm,setconfirm]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(!name||!email||!password||!confirm){
            alert("Please fill in all the fields");
            return

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
         }

         const existingRecruiters = ['abc@gmail.com', 'pqr@gmail.com'];
         if(existingRecruiters.includes(email)){
            alert("User already exists . Please try to login");
            return
         }

         if (password !== confirmPassword) {
              alert('Passwords do not match.');
                 return;
                }

        alert("Registered Succsessfully");
        navigate('/recruiter/Dashboard');

    }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Recruiter Login</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>

            <input
            type="text"
            placeholder='Full Name'
            value={name}
            onChange={(e)=>setname(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="password"
            placeholder='Confirm Password'
            value={confirm}
            onChange={(e)=>setconfirm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Register
          </button>
        </form>
        </div>
        </div>
      

  )
}

export default Register
