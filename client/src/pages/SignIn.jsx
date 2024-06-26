import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({})
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false)
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value, 
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      setLoading(true)
      const res = await fetch('/server/auth/signin',
        {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json();
        if(data.success === false){
          console.log(data);
          setError(data.message);
          setLoading(false)
          return
        }
        navigate('/')
        setLoading(false)
        setError(null)
    }
    catch(error){
      setLoading(false)
      setError(error.message)
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-sm"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-sm"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-blue-950 text-cream p-3 rounded-sm hover:opacity-95 disabled:opacity-80 uppercase">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

