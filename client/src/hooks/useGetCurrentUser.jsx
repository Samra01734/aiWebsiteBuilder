
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {serverUrl} from '../App'
import  {useDispatch} from react-redux
import { setUserData } from '../redux/userSlice'

const useGetCurrentUser = () => {
  const dispatch= useDispatch()

    useEffect(()=>{
  const getCurrentUer=async ()=>{
    try {
        const result= await axios.get(`${serverUrl}/api/user/me`,
            {withCredentials:true}
        )
        // console.log(result)
        dispatch(setUserData)
    } catch (error) {
        
    }

  }
  getCurrentUer()
    },[])
}

export default useGetCurrentUser
