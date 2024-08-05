import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "../@types/currentUser";

const initialState:currentUser ={
    id: '',
    name: '',
    email: '',
    role: '',
    blocked:false,
    user:undefined

}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setRole:(state,action)=>{
            state.role=action.payload
        },
        removeRole:(state)=>{
            state.role=''
        },
        setUser:(state,action)=>{
            const {role,name,email,id,blocked}=action.payload;
            console.log(action.payload,'action paylaod')
            state.role=role
            state.name=name
            state.email=email
            state.id=id
            state.blocked=blocked


        },
      
        removeUser:(state)=>{
            state.role = '';
            state.email='';
            state.id="";
            state.name="";
        }
    }


})
export const {setRole,removeRole,removeUser, setUser} = userSlice.actions;
export default userSlice.reducer;