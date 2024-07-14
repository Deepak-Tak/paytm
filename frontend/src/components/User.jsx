import { useDispatch } from "react-redux";
import { tooglesendMoney } from "../store/sendMoneySlice";


const User = ()=>{

    const dispatch = useDispatch()
    

    return <div className="flex justify-between">
        <div> <span className="bg-gray-300 py-2 px-3 mr-2 rounded-full font-semibold">U1</span>User</div>
        <button onClick={()=>dispatch(tooglesendMoney())} className="bg-gray-800 text-white text-sm p-2 px-3 rounded-lg">Send Money</button>
        
    </div>
}

export default User;