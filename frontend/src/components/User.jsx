import { useDispatch } from "react-redux";
import { tooglesendMoney } from "../store/sendMoneySlice";


const User = ({item, index})=>{
    const dispatch = useDispatch()
    return <div className="flex justify-between py-1 min-h-0 hover:bg-slate-200 hover:bg-opacity-30">
        <div className="flex items-center">
             <div className="bg-gray-300 py-2 px-3 mr-2 rounded-full font-semibold">U{+index}</div>
             {item.FirstName}
        </div>
        <button onClick={()=>dispatch(tooglesendMoney(item))} className="bg-gray-800 text-white text-sm p-2 px-3 rounded-lg">Send Money</button>
        
    </div>
}

export default User;