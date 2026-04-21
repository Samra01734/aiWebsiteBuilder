import React, { useEffect, useState } from 'react'
import {useParam} from 'react-router-dom'
import axios from 'axios'
import {serverUrl} from '../App'
import { ChessKing } from 'lucide-react'

const Editor = () => {
    const {id}=useParams()
    const[website,setWebsite]=useState(null)
    const[error,setError]=useState(null)
    useEffect(()=>{
          const handleGetWebsite=async ()=>{
            try {
               const result=await axios.get(`${serverUrl} /api/webite/get-by-id/${id}
                `,{withCredentials:true})
                console.log(resule)
                setWebsite(result.data)
            } catch (error) {
              
                console.log(error)   
              setError(error.response.data.message)         }
          }
    },[id])
    if(error){
      return(
        <div className='h-screen flex items-center justify-center bg-black text-red-400'>
          {error}
        </div>
      )
    }
      if(!website){
      return(
        <div className='h-screen flex items-center justify-center bg-black text-white'>
          Loading...
        </div>
      )
    }

  return (
    <div className='h-screen w-screen flex bg-black text-white overflow-hiddden'>
      
    </div>
  )
}

export default Editor
