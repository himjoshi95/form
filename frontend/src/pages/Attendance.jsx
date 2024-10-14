import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Attendance(){

    const {userId} = useParams();
    const navigate = useNavigate();

    const [user,setUser] = useState({})
    const [isLoading,setIsLoading] = useState(false);

    const API_URL = "http://localhost:3000";

    const delay = async() =>{
        return await new Promise(resolve => setTimeout(resolve,2000))
    }

    useEffect(() => {
        // console.log('User ID:', userId); // Ensure userId is correct
        setIsLoading(true)
        if (!userId) {
        console.error('User ID is invalid');
        return;
    }
        axios.get(`${API_URL}/api/user/userDetails?filter=${userId}`)
            .then(response => {
                // console.log(response.data);
                setUser(response.data);                
                // ------ CONDITIONS FOR ROUTING USER ACCORDING TO THE FLAGS ----------------
                if(response.data.desiredUser?.feedbackFlag === true && response.data.desiredUser?.certificateFlag === false){
                    navigate(`/feedback/${response.data.desiredUser?._id}`);
                }else if(response.data.desiredUser?.feedbackFlag === true && response.data.desiredUser?.certificateFlag === true){
                    navigate(`/certificate/${response.data.desiredUser?._id}`);
                }
            }).catch(err => console.log(err))
            .finally(()=>{
                setIsLoading(false);
            })         
    }, [userId])

    

    return (
        <div>
            <div className="flex flex-col items-center border py-2 mt-2 shadow-lg">            
                    <h1 className="text-md font-medium">Attendance</h1>
                    <p>You have Successfully Registered with us.</p>    
                    {/* {JSON.stringify(user)}        */}
            </div>

            {/* START FROM HERE ATTENDANCE */}
            <div className="mt-10 shadow-lg ">
                <div className="flex justify-center">                                    
                    { !isLoading ? (
                        <div className="grid grid-cols-2 gap-4">
                        <p>Name </p>  
                        
                        <p>{user.desiredUser?.firstName} {user.desiredUser?.lastName}</p>
                        {/* <p>{user.desiredUser.title} {user.desiredUser.firstName} {user.desiredUser.lastName}</p> */}
                        <p>Mobile</p>
                        {/* <p>987</p> */}
                        <p>{user.desiredUser?.mobile}</p>  
                        <p>Email</p>
                        {/* <p>h@gmail.com</p> */}
                        <p>{user.desiredUser?.email}</p>
                        <p>Designation</p>
                        {/* <p>Web dev</p> */}
                        <p>{user.desiredUser?.designation}</p>
                        <p>Company</p>
                        {/* <p>P</p> */}
                        <p>{user.desiredUser?.company}</p>
                        <p>Industry</p>
                        <p>Tech</p>
                        {/* <p>{user.desiredUser.industry}</p> */}
                        <p>City</p>
                        {/* <p>DElhi</p> */}
                        <p>{user.desiredUser?.city}</p>
                        <p>Training</p>
                        {/* <p>JS</p> */}
                        <p>{user?.trainingName}</p>
                        {/* <p>{user.desiredUser?.feedbackFlag ?  "True" : "undefined"}</p> */}
                    </div>
                    ): "Loading........"}               
                </div>
            <div className="py-5 flex justify-center">
                <div>
                    <button onClick={() => navigate(`/test-paper/${userId}`)} className="border px-4 py-1 bg-red-500 text-white">Start Test</button>
                </div>
            </div>

            </div>


        </div>
    )
}

export default Attendance;