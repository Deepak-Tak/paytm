import { useDispatch, useSelector } from "react-redux";
import { tooglesendMoney } from "../store/sendMoneySlice";
import { useState } from "react";



const SendMoney = ()=>{
    const [success,setSuccess] = useState(0)
    const [amount , setAmount]=useState(null)
    const [error,setError] =useState({isTrue:0,msg:""})
    const dispatch = useDispatch()
    const {Account,FirstName,LastName} = useSelector((store)=>store.sendMoney.sendMoney)
    async function handleClick(){
        const response = await fetch("http://localhost:3000/api/v1/account/transfer",{
            method:"post",
            headers:{ "Content-Type": "application/json",
                    "authorization":`Bearer${" "+localStorage.getItem("token")}`},
            body:JSON.stringify({to:Account,amount})
        })
        if(response.ok)
        return setSuccess(1)
        const json = await response.json();
        setError({isTrue:1,msg:json.msg})


    }

    return <>
    {success? <PaymentSuccess setSuccess={setSuccess}/>  : 
            <div className="fixed min-w-60 bg-white top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-1/2 p-6 py-8 rounded-md shadow-lg">
        <button onClick={()=>dispatch(tooglesendMoney(0))}  className="bg-red-500 hover:bg-red-700 text-white w-11 top-0 right-0 border-t-2 border-r-2 absolute">X</button>
            <div className="text-2xl font-bold text-center mb-10">Send Money</div>
            <div>
            <div className="flex items-center">
            <div className="text-2xl font-medium bg-slate-500 rounded-full px-3 py-1 mr-3">{FirstName.charAt(0)}</div>
            <div className="text-lg font-sans font-bold">
                {FirstName+" "+LastName}
            </div>
            </div>
            <div className="text-base pl-2 font-semibold mt-6">Amount (in Rs)</div>
            <input placeholder="Enter Amount" type="number" className="border-2 p-2 rounded-md h-9 w-full "
            onChange={(e)=>setAmount(e.target.value)}
            value={amount}
            ></input>
            <button className="my-4 py-2 w-full text-center text-base font-semibold bg-green-500 hover:bg-green-700 text-white rounded-md"
            onClick={handleClick}
            
            >Initiate Transfer</button>
            <div className="text-base text-center text-red-700 font-semibold px-4">{error.isTrue?error.msg:null}</div>

        </div>
        </div>}
    </>
}

export default SendMoney;

const PaymentSuccess = ({setSuccess}) =>{
    const dispatch = useDispatch()


    return <div class="bg-gray-100 fixed min-w-60 top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-1/2 rounded-md shadow-lg">
                <button onClick={()=>{
                    setSuccess(0)
                    dispatch(tooglesendMoney(0))}}  className="bg-red-500 hover:bg-red-700 text-white w-11 top-0 right-0 border-t-2 border-r-2 absolute">X</button>

    <div class="bg-white p-6  md:mx-auto">
      <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
          </path>
      </svg>
      <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
          <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
          <p> Have a great day!  </p>
      </div>
  </div>
</div>
}