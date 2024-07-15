import Body from "./Body";
import userIcon from "../assets/user-3296.svg"
import SendMoney from "./SendMoney";
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";


const Dashboard = ()=> {
    const loginState = useSelector((store)=>store.login.loginState)
    const sendMoney = useSelector((store)=>store.sendMoney.sendMoney)
    const [userInfo, setUserInfo] = useState({FirstName:"User", balance:"0"})
    
    const navigate = useNavigate()
    async function fetchBalance (){
               
        const response = await fetch("http://localhost:3000/api/v1/account/balance",{
            headers:{"authorization":`Bearer${" "+localStorage.getItem("token")}`}
        })
        const json = await response.json()
        setUserInfo(json)
        

    }
    useEffect(()=>{
        if(!loginState)
        navigate("/signin")
        if(loginState)
        fetchBalance();
    },[sendMoney])
   
    return<div>
     <div className={`bg-gray-600 min-h-screen flex justify-center items-center min-w-[340px] ${sendMoney?"pointer-events-none":""} `}>
        <div className="bg-white w-11/12 h-[80vh] flex flex-col gap-6 p-6">
        <div className="flex justify-between border-y-2 py-3">
            <h1 className="text-2xl font-bold">Payments App</h1>
            <div className="flex gap-4">
            <div className="text-lg font-semibold self-center">Hello, {userInfo.FirstName}</div>
            <img alt="user" src={userIcon} className="size-10"></img>
            </div>
        </div>
        <div className="flex flex-col gap-5">
            <div className="text-xl font-semibold">
                Your Balance -<span className="font-sans">{userInfo.balance} (Rs)</span> 
            </div>
            <Body loginState={loginState} />
        </div>
        </div>
        
    </div>
    {sendMoney?<SendMoney />:null}
    </div>
}

export default Dashboard;