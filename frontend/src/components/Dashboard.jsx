import Body from "./Body";
import userIcon from "../assets/user-3296.svg"
import SendMoney from "./SendMoney";
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";


const Dashboard = ()=> {
    const loginState = useSelector((store)=>store.login.loginState)
    const sendMoney = useSelector((store)=>store.sendMoney.sendMoney)

    
    const navigate = useNavigate()
    console.log(loginState)
    useEffect(()=>{
        if(!loginState)
            navigate("/signin")
    })
    return<div>
     <div className={`bg-gray-600 min-h-screen flex justify-center items-center min-w-[340px] ${sendMoney?"pointer-events-none":""} `}>
        <div className="bg-white w-11/12 flex flex-col gap-6 p-6">
        <div className="flex justify-between border-y-2 py-3">
            <h1 className="text-2xl font-bold">Payments App</h1>
            <div className="flex gap-4">
            <div className="text-lg font-semibold self-center">Hello, User</div>
            <img alt="user" src={userIcon} className="size-10"></img>
            </div>
        </div>
        <div className="flex flex-col gap-5">
            <div className="text-xl font-bold">
                Your Balance
            </div>
            <Body />
        </div>
        </div>
        
    </div>
    {sendMoney?<SendMoney />:null}
    </div>
}

export default Dashboard;