
import {consfigStore} from "@reduxjs/toolkit"
import  userSlice from ' ./userSlice'
export const store=consfigureStore({
    reducer:{
        user:userSlice
    }
})