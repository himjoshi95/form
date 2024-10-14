import { useState } from "react";
import { useParams } from "react-router-dom";


function UpdateTrainings() {

    const [isLoading,setIsLoading] = useState(false);
    const [dropdown, setDropdown] = useState("Select Status");
    const {name,type} = useParams();

    const handleSubmit = async(e) =>{

        alert("Are you sure you want to handle Submit");
    }
    return (
        <div>
            <div className="flex flex-col items-center border py-2 mt-2 shadow-lg">
                <h1 className="text-md font-medium">Update Training Status</h1>
            </div>

            <div className="border shadow-lg mt-5 mx-5 p-10">
                {isLoading ?
                    <div className="pb-12 grid place-items-center">
                       {/* <Loader className="animate-spin"/> */}
                       <LoaderCircle className="animate-spin text-xl"/>
                    </div>
                    :
                    <div>
                        <div className="pb-10 grid grid-cols-2 gap-4">
                            <div>
                                Training Program:   {name}
                            </div>
                            <div>
                                Current Status: {type}
                            </div>
                        </div>
                        <form>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex gap-5">
                                    <label></label>

                                </div>
                                <div className="flex gap-5">
                                    <label>Status : </label>
                                    <select className="w-[200px] px-5 focus:outline-none border"                       
                                         value={dropdown}
                                         onChange={(e) => setDropdown(e.target.value)}
                                    >
                                        <option  value="Select Status">Select Status</option>
                                        <option value="Attendance">Attendance</option>
                                        <option value="Test Paper">Test Paper</option>
                                        <option value="Feedback">Feedback</option>
                                        <option value="Certificate">Certificate</option>
                                    </select>
                                </div>
                                <div className="">
                                    <button onClick={handleSubmit} className="border px-3 py-1 rounded-full bg-red-500 text-white">Submit</button>
                                </div>
                            </div>

                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default UpdateTrainings;