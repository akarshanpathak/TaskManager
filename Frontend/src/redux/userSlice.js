import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentUser:{},
    error:null, 
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state,action)=>{
              state.currentUser=null
              state.error=null
              state.loading=true
        },
        signInFailure:(state,action)=>{
            state.currentUser=null
            state.error=action.payload
            state.loading=false
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.error=null
            state.loading=false
            console.log("from user slive",state.currentUser);
            
        },
        signOutSuccess:(state,action)=>{
            state.currentUser=null
            state.error=null
            state.loading=false
        }
    }
})

export const {signInFailure,signInStart,signInSuccess,signOutSuccess} = userSlice.actions
export default userSlice.reducer
