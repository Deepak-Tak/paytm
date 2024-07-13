import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Signin = () =>{
     const [formData,setFormData]=useState({Email:'',Password:''})
     const [error,setError] = useState(null);
     const navigate = useNavigate()

     
    const handleChange =(e)=>{
        const {name,value} = e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }
    const handleSubmit =async (e)=>{
        e.preventDefault()
        const respose = await fetch("http://localhost:3000/authentication/signin",
            {
                method : "post",
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify(formData)
            }
        )
        const json = await respose.json();
        if(respose.ok)
        setError("Signin success")
        else
        setError("Tryagain")
        

    }
    return (<div className="bg-gray-600 p-5 bg-fixed min-h-screen flex justify-center items-center" >
        <form onSubmit={handleSubmit} className=" rounded-lg w-[360px] bg-white p-3 m-2 flex flex-col gap-y-6 h-fit">
        <div className="flex flex-col items-center p-2">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-base text-center mt-2 text-gray-700 font-semibold opacity-80 px-4">Enter your credentials to Log in</p>
        </div>
        
        <div className="flex flex-col gap-y-2 px-2">
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
           
        </div>
        <div className="flex flex-col items-center px-2">
            <div className="min-w-full">
             <button type="submit" className="bg-slate-800 hover:bg-black text-center rounded-lg min-w-full text-lg h-10 text-white font-normal font-sans">Log In</button>
            </div>
            <div className="text-base text-center mt-2 text-gray-700 font-semibold opacity-80 px-4">Not have account? <a className="cursor-pointer" onClick={()=>navigate("/signup")}>Sign up</a></div>
        </div>
        <div className="text-base text-center text-red-700 font-semibold px-4">{error?error:null}</div>
        </form>
        </div>
        
    )
}
export default Signin