import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const {loading,error} = useSelector((state)=>state.user)
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value, 
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      dispatch(signInStart());
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
          dispatch(signInFailure(data.message))
          return
        }
        navigate('/')
        dispatch(signInSuccess(data))
    }
    catch(error){
      dispatch(signInFailure(error.message))
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

