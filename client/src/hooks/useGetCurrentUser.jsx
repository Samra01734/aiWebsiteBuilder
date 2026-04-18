
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {serverUrl} from '../App'

const useGetCurrentUser = () => {

    useEffect(()=>{
  const getCurrentUer=async ()=>{
    try {
        const result= await axios.get(`${serverUrl}/api/user/me`,
            {withCredentials:true}
        )
        console.log(result)
    } catch (error) {
        
    }

  }
  getCurrentUer()
    },[])
}

export default useGetCurrentUser
