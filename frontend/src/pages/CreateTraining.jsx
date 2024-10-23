import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {LoaderCircle} from 'lucide-react';

import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useAuthStore } from "../store/authStore";

function CreateTraining() {

    const {admin} = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);
    const [trainingName, setTrainingName] = useState("");

    const API_URL ="http://localhost:3000";


    const addTrainingSubmit = async (e) => {
        e.preventDefault();
        if (trainingName === "") {
            toast.error("Training Name cannot be left Empty");
            return;
        }
        const submit = confirm("Are you sure you want to add the Training ?");
        if (submit) {
            setIsLoading(prev => !prev);
            const response = await axios.post(`${API_URL}/api/admin/addMaster`, { name: trainingName })
            // console.log(response.data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoading(prev => !prev);
            toast.success(response.data?.message)
            setTrainingName("");
        }
    }
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
                                <h1 className="text-xl pb-5 font-semibold ">Create Trainings</h1>
                                <div className="border border-blue-300 w-full rounded py-5 mr-10">
                                    <form>
                                        {isLoading ?
                                            <div className="flex justify-center">
                                                <LoaderCircle className="animate-spin duration-200" />
                                            </div>
                                            :
                                            <div className="flex flex-col gap-5 md:flex-row md:gap-0">
                                                <div className="md:basis-1/4 pl-1">
                                                    <label className="text-md font-semibold">Training Name</label>
                                                </div>
                                                <div className="md:basis-2/4 px-1 md:px-0">
                                                    <input
                                                        type="text"
                                                        className="border py-0.5 px-1 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
                                                        placeholder="Enter training name"
                                                        value={trainingName}
                                                        onChange={(e) => setTrainingName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="md:basis-1/4 mx-4">
                                                    <button
                                                        className="border px-2 py-1 bg-blue-500 text-white font-semibold hover:bg-blue-400 rounded"
                                                        onClick={addTrainingSubmit}
                                                    >
                                                        Add Training
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        }
                    </div>

                </div>


            </div>

        </div>
    )



}

export default CreateTraining;