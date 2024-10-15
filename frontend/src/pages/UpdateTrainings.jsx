import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle, ArrowLeftToLine } from 'lucide-react';



function UpdateTrainings() {

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [dropdown, setDropdown] = useState("Select Status");
    const [link,setLink] = useState("Select Here");
    const { name, type } = useParams();

    const API_URL = 'http://localhost:3000'

    //get training details
    useEffect(() => {
        axios.get(`${API_URL}/api/admin/trainingDetails?type=${type}`)
            .then(response => {
                // console.log(response.data.training)  
                setStatus(response.data.training.status);
                setDropdown(response.data.training.status);
                setLink(response.data.training.link ? 'Yes': 'No');
            })
            .catch(error => console.log(error))
    }, [type, isLoading])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const submit = confirm("Are you sure you want to submit ?")
        if (submit) {
            setIsLoading(prev => !prev);
            const response = await axios.patch(`${API_URL}/api/admin/update-training`, { type, dropdown, link })
            // console.log(response.data)
            await new Promise(r => setTimeout(r, 1000))
            setIsLoading(prev => !prev);
            toast.success("Status Updated Successfully");
        }
    }
    return (
        <div>
            <div className="flex flex-col items-center border py-2 mt-2 shadow-lg">
                <h1 className="text-md font-medium">Update Training Status</h1>
            </div>

            <div className="border shadow-lg mt-5 mx-5 p-10">
                <div className=" pb-5">
                    <Link to={`/dashboard`} className="text-blue-500 flex items-center"><ArrowLeftToLine /><span className="text-lg">DASHBOARD</span></Link>
                </div>
                {isLoading ?
                    <div className="pb-12 grid place-items-center">
                        {/* <Loader className="animate-spin"/> */}
                        <LoaderCircle className="animate-spin text-xl" />
                    </div>
                    :
                    <div>
                        <div className="pb-10 grid grid-cols-2 gap-4">
                            <div>
                                Training Program:   {name}
                            </div>
                            <div>
                                Current Status: {status === 'Select Status' ? '-' : status}
                            </div>
                        </div>
                        <form>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center gap-2">
                                    <label>Link</label>
                                    <select className="w-[120px] px-5 focus:outline-none border border-blue-500 rounded-full cursor-pointer"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    >
                                        <option disabled value="Select Here">Select Here</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>

                                </div>
                                <div className="flex items-center gap-2">
                                    <label>Status</label>
                                    <select className="w-[200px] px-5 focus:outline-none border border-blue-500 rounded-full cursor-pointer"
                                        value={dropdown}
                                        onChange={(e) => setDropdown(e.target.value)}
                                    >
                                        <option disabled value="Select Status">Select Status</option>
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