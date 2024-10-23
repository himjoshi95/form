import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { LoaderCircle,Search } from "lucide-react";






function Participants() {

    const [users, setUsers] = useState([]);
    const API_URL = "http://localhost:3000";
    const [filter, setFilter] = useState(""); 

    useEffect(() => {
        try {
            const timer = setTimeout(() => {
                axios.get(`${API_URL}/api/user/allUsers?filter=${filter}`)
                    .then((response) => {                        
                        setUsers(response.data.existingUsers);
                    }).catch(error => {
                        console.log(error)
                    })
            }, 500);

            return ()=>{
                clearTimeout(timer)
            }
        } catch (error) {
            console.log(error.message)
        }
    }, [filter])

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex flex-col md:flex-row">
                <div className="w-full md:w-1/5 bg-gray-100 p-5">
                    <SideBar />
                </div>
                <div className="flex-1 w-full md:w-4/5">
                    <div className="border mt-5 md:mt-10 mx-2 md:mx-5 p-2 md:p-10 shadow-lg">
                        <h1 className="text-xl font-semibold pb-5">Participants</h1>
                        <div className="pb-5">
                            <div className="md:w-[400px] border-2 flex items-center px-1 rounded-full overflow-hidden focus-within:border-blue-500">
                                <input
                                    type="text"
                                    className="px-2 py-1 w-full focus:outline-none" placeholder="Search here.."
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                                <Search color="#808080" />
                            </div>
                        </div>
                        {
                            users.length > 0 ?
                                <div className="overflow-x-auto">
                                    <table className="w-full border text-sm md:text-base">
                                        <thead>
                                            <tr>
                                                <th className="border text-center p-2">Sno.</th>
                                                <th className="border text-center p-2">Name</th>
                                                <th className="border text-center p-2">Training</th>
                                                <th className="border text-center p-2">Link</th>
                                                <th className="border text-center p-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {users.length > 0 ? (
                                                users.map((item, index) => (
                                                    <tr key={index} className="border">
                                                        <td className="p-2 border">{index + 1}.</td>
                                                        <td className="p-2 border">{item.title.slice(0, 1)}{item.title.slice(1).toLowerCase()}  {item.firstName} {item.lastName}</td>
                                                        <td className="p-2 border">{item?.trainingId?.name}</td>
                                                        <td className="p-2 border"><Link className="text-blue-500 underline" to={`/attendance/${item._id}`}><span className="break-all">{`http://localhost:5173/training/${item.trainingId.name}/${item.trainingId._id}`}</span></Link></td>
                                                        <td className="p-2 border"><Link className="text-blue-500 underline" to={`/update-status/${item._id}`}>view/edit</Link></td>
                                                    </tr>
                                                )
                                                )
                                            )
                                                :
                                                <tr>
                                                    <td className="border"></td>
                                                    <td className="text-center py-5">No Participants</td>
                                                    <td className="border"></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div>
                                    <div className="text-2xl flex justify-center"><LoaderCircle className="animate-spin" /></div>
                                </div>


                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Participants;