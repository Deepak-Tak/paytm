import { useState } from "react"
import {useNavigate} from 'react-router-dom'

const Signup = () =>{

    const [formData,setFormData] = useState({FirstName:"",LastName:"",Email:"",Password:"",InitialBalance:0});
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault() 
        try{
            const respose = await fetch("http://localhost:3000/authentication/signup",{
                method: "post",
                body: JSON.stringify(formData) ,
                headers: {
                    "Content-Type": "application/json",
                  }
            })
            if(respose.ok)
            return setError("signup success")
            else
            setError("Try Again")
        }
        catch(e){
            setError("Try Again")
        }
        
    }
    const handleChange = (e)=>{
             const {name , value} = e.target
             setFormData((prev)=>({...prev,[name]:value}))
    }
    return (<div className="bg-gray-600 p-5 bg-fixed min-h-screen flex justify-center" >
        <form onSubmit={handleSubmit} className=" rounded-lg w-[360px] bg-white p-3 m-2 flex flex-col gap-y-6">
        <div className="flex flex-col items-center p-2">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-base text-center mt-2 text-gray-700 font-semibold opacity-80 px-4">Enter your information to create an account</p>
        </div>
        
        <div className="flex flex-col gap-y-2 px-2">
            <div>
            <h3 className="text-base font-semibold">First Name</h3>
            <input type="text" placeholder="Deepak" className="border-2 p-2 rounded-md h-9 w-full mt-2"
             name="FirstName" value={formData.FirstName} onChange={handleChange}></input>
            </div>
            <div>
            <h3 className="text-base font-semibold">Last Name</h3>
            <input type="text" placeholder="Saini" className="border-2 p-2 rounded-md h-9 w-full mt-2" 
            name="LastName" value={formData.LastName} onChange={handleChange}></input>
            </div>
            <div>
            <h3 className="text-base font-semibold">Email</h3>
            <input type="email" placeholder="deepaksaini@gmail.com" className="border-2 p-2 rounded-md h-9 w-full mt-2" 
            name="Email" value={formData.Email} onChange={handleChange}></input>
            </div>
            <div>
            <h3 className="text-base font-semibold">Password</h3>
            <input type="password" className="border-2 p-2 rounded-md h-9 w-full mt-2" 
            name="Password" value={formData.Password} onChange={handleChange}></input>
            </div>
            <div>
            <h3 className="text-base font-semibold">Initial amount</h3>
            <input type="number" className="border-2 p-2 rounded-md h-9 w-full mt-2" 
            name="InitialBalance" value={formData.InitialBalance} onChange={handleChange}></input>
            </div>
        </div>
        <div className="flex flex-col items-center px-2">
            <div className="min-w-full">
             <button type="submit" className="bg-slate-800 hover:bg-black text-center rounded-lg min-w-full text-lg h-10 text-white font-normal font-sans">Sign up</button>
            </div>
            <div className="text-base text-center mt-2 text-gray-700 font-semibold opacity-80 px-4">already have an account? <a className="cursor-pointer" onClick={()=>navigate("/signin")}>Login</a></div>
        </div>
        <div className="text-base text-center text-red-700 font-semibold px-4">{error?error:null}</div>
        </form>
        </div>
        
    )
}
export default Signup