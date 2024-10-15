import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle,ArrowLeftToLine } from 'lucide-react';



function Update() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [dropdown, setDropdown] = useState("Select Status");

    const API_URL = "http://localhost:3000";

    useEffect(() => {
        axios.get(`${API_URL}/api/user/userDetails?filter=${userId}`)
            .then(response => {
                // console.log(response.data.desiredUser)
                if (response.data.desiredUser.attendanceFlag === true
                    && response.data.desiredUser.testPaperFlag === false
                    && response.data.desiredUser.feedbackFlag === false
                    && response.data.desiredUser.certificateFlag === false) {
                    setStatus("Attendance")
                    setDropdown("Attendance")
                    // console.log("ATtendance")
                } else if (response.data.desiredUser.attendanceFlag === true
                    && response.data.desiredUser.testPaperFlag === true
                    && response.data.desiredUser.feedbackFlag === false
                    && response.data.desiredUser.certificateFlag === false) {
                    setStatus("Test Paper")
                    setDropdown("Test Paper")
                } else if (response.data.desiredUser.attendanceFlag === true
                    && response.data.desiredUser.testPaperFlag === true
                    && response.data.desiredUser.feedbackFlag === true
                    && response.data.desiredUser.certificateFlag === false
                ) {
                    setStatus("Feedback")
                    setDropdown("Feedback")
                } else if (response.data.desiredUser.attendanceFlag
                    && response.data.desiredUser.testPaperFlag
                    && response.data.desiredUser.feedbackFlag
                    && response.data.desiredUser.certificateFlag) {
                    setStatus("Certificate")
                    setDropdown("Certificate")
                }
                setUser(response.data)
            }).catch(err => console.log(err))
    }, [userId, status])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submit = confirm("Are you sure you want to update?")

        if (submit) {
            setIsLoading(prev => !prev);
            const response = await axios.patch(`${API_URL}/api/admin/update-status`, { userId, dropdown });
            console.log(response.data);
            setStatus(response.data.dropdown);
            await new Promise(r => setTimeout(r, 1000))
            setIsLoading(prev => !prev);
            toast.success("Status Updated Successfully");
        } else {
            console.log("Not Submitted");
        }

    }

    return (
        <div>
            <div className="flex flex-col items-center border py-2 mt-2 shadow-lg">
                <h1 className="text-md font-medium">Update Status</h1>
            </div>

            <div className="border shadow-lg mt-5 mx-5 p-10">
                <div className=" pb-5">
                    <Link to={`/dashboard`} className="text-blue-500 flex items-center"><ArrowLeftToLine /><span className="text-lg">DASHBOARD</span></Link>
                </div>
                {isLoading ?
                    <div className="h-24 pb-8 grid place-items-center">
                        {/* <Loader className="animate-spin"/> */}
                        <LoaderCircle className="animate-spin text-xl" />
                    </div>
                    :
                    <div>
                        <div className="pb-10 grid grid-cols-2 gap-4">
                            <div>
                                <span className="font-bold">Training Program:</span> {user.trainingName}
                            </div>
                            <div>
                                <span className="font-bold">Current Status:</span> {status}
                            </div>
                        </div>
                        <form>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex gap-5">
                                    <label><span className="font-bold">Name:</span> {user.desiredUser?.title.slice(0, 1)}{user.desiredUser?.title.slice(1).toLowerCase()}  {user.desiredUser?.firstName} {user.desiredUser?.lastName}</label>

                                </div>
                                <div className="flex gap-2 items-center">
                                    <label className="font-bold">Status : </label>
                                    <select className="w-[200px] px-5 py-0.5 focus:outline-none border border-blue-500 rounded-full"
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

export default Update;