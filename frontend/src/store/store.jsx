import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './loginSlice'
import sendMoneySlice from './sendMoneySlice'

const store = configureStore({
        
      reducer : {
            login:loginSlice,
            sendMoney:sendMoneySlice
      }
      } )

export default store