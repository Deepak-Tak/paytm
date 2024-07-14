import { createSlice } from "@reduxjs/toolkit";


const sendMoneySlice = createSlice({
    name: "sendMoney",
    initialState : {
        sendMoney : 0
    },
    reducers : {
        tooglesendMoney : state => {
              state.sendMoney=!state.sendMoney
        }
    }

})

export const {tooglesendMoney} =sendMoneySlice.actions;
export default sendMoneySlice.reducer ;