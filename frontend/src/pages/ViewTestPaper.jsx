import { ArrowLeftToLine } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";


function ViewTestPaper(){
    const {name,type} = useParams();

    const API_URL = "http://localhost:3000";

    

    return (
        <div>
            <div className="flex justify-center border py-5 mt-2 shadow-lg">
                    <h1 className="text-md font-medium">{name.toUpperCase()} - VIEW TEST PAPER</h1>
            </div>

            <div className="h-fit border shadow-lg mt-5 mx-5 p-10">
                <div className="pb-5">
                        <Link to={`/dashboard`} className="text-blue-500 flex items-center"><ArrowLeftToLine /><span className="text-lg">DASHBOARD</span></Link>
                </div>


            </div>
        </div>
    )

}

export default ViewTestPaper;