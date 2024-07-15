import { useEffect, useState } from "react";
import User from "./User";


const Body = ({loginState}) =>{
    const [query,setQuery]=useState("")
    const [users,setUsers]=useState([])
    async function fetchUsers  (){
        const response =  await fetch(`http://localhost:3000/api/v1/users/bulk?filter=${query}`,{
            headers:{'authorization':`Bearer${" "+localStorage.getItem("token")}`}
        })
        if(!response.ok)
        return setUsers([])
        const json = await response.json()
        setUsers(json)
    }
    useEffect(()=>{
         if(loginState)
         fetchUsers();
    },[query])

    return <div>
        <div>
            <input type="text" className="border-2 p-2 rounded-md h-9 w-full mt-2 mb-5" placeholder="Search User"
            onChange={(e)=>setQuery(e.target.value)}
            value={query}
            ></input>
        </div>
        <div className="flex flex-col no-scrollbar overflow-y-scroll">
         {users?.map((item,j)=><User key={item._id} item={item} index={j+1}/>)}   
        </div>
    </div>
}


export default Body;