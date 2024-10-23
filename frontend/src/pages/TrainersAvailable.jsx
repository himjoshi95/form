import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoaderCircle, Search } from "lucide-react";

import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useAuthStore } from "../store/authStore";


function TrainersAvailable() {

    const [trainers, setTrainers] = useState([]);
    const [filter, setFilter] = useState("");
    const {admin} = useAuthStore();
    const API_URL = "http://localhost:3000";

    useEffect(() => {
        try {
            const timer = setTimeout(() => {
                axios.get(`${API_URL}/api/admin/allTrainers?filter=${filter}`)
                    .then(response => {
                        // console.log(response.data.allTrainers)
                        setTrainers(response.data.allTrainers)
                    })
                    .catch(error => console.log(error.message));
            }, 500);

            return () => {
                clearTimeout(timer);
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [filter]);
    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex md:flex-row">
                <div className="w-32 md:basis-1/5 bg-gray-100 p-5">
                    <SideBar />
                </div>

                <div className="flex-1 md:basis-4/5">
                    <div>
                        {
                            admin.role === "superadmin"
                            &&
                            <div className="border mt-10 mx-5 p-2 md:p-10 shadow-lg">
                                <h1 className="text-xl font-semibold pb-5">Trainers Available</h1>
                                <div className="pb-5">
                                    <div className="w-[200px] md:w-[400px] border-2 flex items-center px-1 rounded-full overflow-hidden focus-within:border-blue-500">
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
                                    // trainerLoading ?
                                    //     <div className="text-2xl flex justify-center"><LoaderCircle className="animate-spin" /></div>
                                    //     :
                                        trainers.length > 0 ?
                                        <div className="pt-5 md:pt-0">
                                            <table className="w-full border">
                                                <thead>
                                                    <tr className="border text-center">
                                                        <th className="border">Sno.</th>
                                                        <th className="border">Trainer</th>
                                                        <th className="border">Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        trainers.length > 0
                                                            ?
                                                            trainers.map((item, index) => (
                                                                <tr key={index} className="border text-center">
                                                                    <td className="border py-1">{index + 1}.</td>
                                                                    <td className="border py-1">{item.username}</td>
                                                                    <td className="border py-1 underline text-blue-500">
                                                                        <Link to={`/view-trainer/${item._id}`}>view details</Link>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                            :
                                                            <tr>
                                                                <td className="border"></td>
                                                                <td className="border text-center py-2 font-semibold">No Trainers Available</td>
                                                                <td></td>
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
                        }
                    </div>
                </div>

            </div>
        </div>
    )

}

export default TrainersAvailable;