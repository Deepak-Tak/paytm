import { useDispatch } from "react-redux";
import { tooglesendMoney } from "../store/sendMoneySlice";



const SendMoney = ()=>{
    const dispatch = useDispatch()

    return <div className="fixed min-w-60 bg-white top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-1/2 p-6 py-8 rounded-md shadow-lg">
        <button onClick={()=>dispatch(tooglesendMoney())}  className="bg-red-500 hover:bg-red-700 text-white w-11 top-0 right-0 border-t-2 border-r-2 absolute">X</button>
        <div className="text-2xl font-bold text-center mb-10">Send Money</div>
        <div>
            <div className="flex items-center">
            <div className="text-2xl font-medium bg-slate-500 rounded-full px-3 py-1 mr-3">A</div>
            <div className="text-lg font-sans font-bold">
                Friend's name
            </div>
            </div>
            <div className="text-base pl-2 font-semibold mt-6">Amount (in Rs)</div>
            <input placeholder="Enter Amount" type="number" className="border-2 p-2 rounded-md h-9 w-full "></input>
            <button className="my-4 py-2 w-full text-center text-base font-semibold bg-green-500 hover:bg-green-700 text-white rounded-md">Initiate Transfer</button>
        </div>
    </div>
}

export default SendMoney;