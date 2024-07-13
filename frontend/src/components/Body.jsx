import User from "./User";


const Body = () =>{


    return <div>
        <div>
            <input type="text" className="border-2 p-2 rounded-md h-9 w-full mt-2 mb-5" placeholder="Search User"></input>
        </div>
        <div className="flex flex-col">
            <User/>
        </div>
    </div>
}


export default Body;