import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CirclePlus, LoaderCircle, View } from "lucide-react";

import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";

function TrainingsAvailable() {

    const API_URL = "http://localhost:3000";
    const [trainings, setTrainings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(prev => !prev);
        try {
            setTimeout(() => {
                axios.get(`${API_URL}/api/admin/allTrainings`)
                    .then((response) => {
                        // console.log(response.data.trainings)
                        setTrainings(response.data.trainings)
                    })
            }, 500)

        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(prev => !prev);

    }, [isLoading])

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex flex-col md:flex-row">
                <div className="w-full md:w-1/5 bg-gray-100 p-5">
                    <SideBar />
                </div>
                <div className="flex-1 w-full md:w-4/5">
                    <div className="border mt-5 md:mt-10 mx-2 md:mx-5 p-2 md:p-10 shadow-lg">
                        <h1 className="text-xl font-semibold pb-5">Trainings Available</h1>
                        {
                            trainings.length > 0 ?
                                <div className="overflow-x-auto">
                                    <table className="w-full border text-sm md:text-base">
                                        <thead>
                                            <tr>
                                                <th className="border text-center p-2">Sno.</th>
                                                <th className="border text-center p-2">Training Links</th>
                                                <th className="border text-center p-2">Status</th>
                                                <th className="border text-center p-2">Add Test Paper</th>
                                                <th className="border text-center p-2">View Test Paper</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trainings.length > 0 ? (
                                                trainings.map((item, index) => (
                                                    <tr key={index} className="border">
                                                        <td className="p-2 border text-center">{index + 1}.</td>
                                                        <td className="p-2 border">
                                                            <Link className="flex flex-col md:flex-row" to={`/training/${item.name}/${item._id}`}>
                                                                <span className="block md:basis-1/4">Training - {item.name}</span>
                                                                <span className="block md:basis-3/4 underline text-blue-500 break-all">
                                                                    {`${API_URL}/training/${item.name}/${item._id}`}
                                                                </span>
                                                            </Link>
                                                        </td>
                                                        <td className="p-2 border text-center">
                                                            <Link to={`/training-update/${item.name}/${item._id}`} className="text-blue-500 underline">view/edit</Link>
                                                        </td>
                                                        <td className="p-2 border text-center">
                                                            <Link to={`/add-testpaper/${item.name}/${item._id}`} className="text-blue-500">
                                                                <CirclePlus className="hover:bg-blue-500 rounded-full hover:text-white" />
                                                            </Link>
                                                        </td>
                                                        <td className="p-2 border text-center">
                                                            <Link to={`/view-testpaper/${item.name}/${item._id}`} className="text-blue-500">
                                                                <View className="text-blue-500 cursor-pointer" />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="border"></td>
                                                    <td className="text-center py-5">No Trainings</td>
                                                    <td className="border"></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div className="text-2xl flex justify-center">
                                    <LoaderCircle className="animate-spin" />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainingsAvailable;