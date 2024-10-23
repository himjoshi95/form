import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { LoaderCircle } from "lucide-react";




function Participants() {

    const [users, setUsers] = useState([]);
    const API_URL = "http://localhost:3000";

    useEffect(() => {
        try {
            setTimeout(() => {
                axios.get(`${API_URL}/api/user/allUsers`)
                    .then((response) => {
                        // console.log(response.data.existingUsers)
                        setUsers(response.data.existingUsers);
                    }).catch(error => {
                        console.log(error)
                    })
            }, 500)
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex flex-row">
                <div className="basis-1/5 bg-gray-100 p-5">
                    <SideBar />
                </div>
                <div className="basis-4/5">
                    <div className=" border mt-10 mx-5 p-10 shadow-lg">
                        <h1 className="text-xl font-semibold">Participants</h1>
                        {
                            users.length > 0 ?
                                <div className="pt-10">
                                    <table className="w-full border">
                                        <thead>
                                            <tr>
                                                <th className="border text-center">Sno.</th>
                                                <th className="border text-center">Name</th>
                                                <th className="border text-center">Training</th>
                                                <th className="border text-center">Link</th>
                                                <th className="bordder text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {users.length > 0 ? (
                                                users.map((item, index) => (
                                                    <tr key={index} className="border">
                                                        <td className="p-2 border">{index + 1}.</td>
                                                        <td className="p-2 border">{item.title.slice(0, 1)}{item.title.slice(1).toLowerCase()}  {item.firstName} {item.lastName}</td>
                                                        <td className="p-2 border">{item?.trainingId?.name}</td>
                                                        <td className="p-2 border"><Link className="text-blue-500 underline" to={`/attendance/${item._id}`}>{`http://localhost:5173/training/${item.trainingId.name}/${item.trainingId._id}`}</Link></td>
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