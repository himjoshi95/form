import axios from "axios";
import { ArrowLeftToLine, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function ViewTestPaper(){
    const {name,type} = useParams();

    const [tests,setTests] = useState([]);

    const API_URL = "http://localhost:3000";
    
    useEffect(()=>{
        axios.get(`${API_URL}/api/testPaper/?type=${type}`)
        .then(response => {
            // console.log(response.data);
            setTests(response.data);
        })
        .catch(err => console.log(err))
    },[])

    return (
        <div>
            <div className="flex justify-center border py-5 mt-2 shadow-lg">
                    <h1 className="text-md font-medium">{name.toUpperCase()} - VIEW TEST PAPER</h1>
            </div>

            <div className="h-fit border shadow-lg mt-5 mx-5 p-10">
                <div className="pb-5">
                        <Link to={`/dashboard`} className="text-blue-500 flex items-center"><ArrowLeftToLine /><span className="text-lg">DASHBOARD</span></Link>
                </div>

                <div className="grid grid-cols-5 gap-5">
                    { tests.length > 0 ? tests.map((test,index) =>(
                        <div key={index} className="border h-44 rounded-lg  shadow-lg" >
                           <div className="p-5 h-full"> 
                                <Link to={`/view/${name}/paper/${index+1}/${test._id}`} className="text-white">
                                    <div className="flex justify-center items-center bg-blue-400 h-full rounded hover:bg-blue-600 cursor-pointer">                                
                                    Paper {index+1}                                
                                    </div>
                                </Link>
                           </div>
                           <div className="flex justify-center">
                                <Link to={`/view/${name}/paper/${index+1}/${test._id}`} className="text-blue-500 underline">view </Link>
                           </div>
                        </div>                        
                    ))
                    :
                    <div className="col-span-5 flex justify-center">
                        <p className="text-xl text-gray-700 font-semibold border border-red-500 p-2 rounded-lg">No Test Paper Added</p>
                    </div>
                }
                </div>

            </div>
        </div>
    )

}

export default ViewTestPaper;