import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Update(){

    const {userId} = useParams();
    const [user,setUser] = useState({});

    const API_URL = "http://localhost:3000";

    useEffect(() => {
        axios.get(`${API_URL}/api/user/userDetails?filter=${userId}`)
            .then(response => {
                // console.log(response.data)
                setUser(response.data)               
            }).catch(err => console.log(err))
    }, [userId])

    return (
        <div>
            <div className="flex flex-col items-center border py-2 mt-2 shadow-lg">            
                    <h1 className="text-md font-medium">Update Status</h1>                  
            </div>

            <div className="border shadow-lg mt-5 mx-5 p-10">
            <div>
                <div className="pb-10">
                    Training Program: {user.trainingName}
                </div>
                <form>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex gap-5">
                            <label>Name : {user.desiredUser?.title}  {user.desiredUser?.firstName} {user.desiredUser?.lastName}</label>
                            
                        </div>
                        <div className="flex gap-5">
                            <label>Status : </label>
                            <select className="w-[200px] px-5 focus:outline-none border">
                                <option value="Select Status">Select Status</option>
                                <option value="Attendance">Attendance</option>
                                <option value="Test Paper">Test Paper</option>
                                <option value="Feedback">Feedback</option>
                                <option value="Certificate">Certificate</option>
                            </select>
                        </div>
                        <div className="">
                            <button className="border px-3 py-1 rounded-full bg-red-500 text-white">Submit</button>
                        </div>
                    </div>
                    
                </form>
            </div>
            </div>
        </div>
    )
}

export default Update;