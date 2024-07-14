import { createSlice } from "@reduxjs/toolkit";


const loginSlice = createSlice({
    name: "loginState",
    initialState : {
        loginState : 0
    },
    reducers : {
        toogleLoginState : state => {
              state.loginState=!state.loginState
        }
    }

})

export const {toogleLoginState} =loginSlice.actions;
export default loginSlice.reducer ;