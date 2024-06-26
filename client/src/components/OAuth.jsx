import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';

export default function OAuth() {
    const dispatch = useDispatch()
    const handleGoogleClick = async  () =>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider)
            
            const res = await fetch('/server/auth/google',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({name : result.user.displayName, email:result.user.email, avatar: result.user.photoURL})
            })
            const data = await res.json();
            dispatch(signInSuccess(data))
        }
        catch(error){
            console.log('Could not sign in with google');
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className="bg-red-700 text-cream p-3 rounded-sm hover:opacity-95 uppercase">
      Continue with Google
    </button>
  )
}
