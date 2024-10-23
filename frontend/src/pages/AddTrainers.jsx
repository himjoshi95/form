import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {LoaderCircle} from 'lucide-react';

import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useAuthStore } from "../store/authStore";



function AddTrainers() {

    const {admin} = useAuthStore();

    const [trainerLoading, setTrainerLoading] = useState(false);
    const [trainerUsername, setTrainerUsername] = useState("");
    const [trainingId, setTrainingId] = useState("Select Here");
    const [trainings, setTrainings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const API_URL ="http://localhost:3000";

    useEffect(() => {
        setIsLoading(prev => !prev);
        try {
            axios.get(`${API_URL}/api/admin/allTrainings`)
                .then((response) => {
                    // console.log(response.data.trainings)
                    setTrainings(response.data.trainings)
                })

        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(prev => !prev);

    }, [isLoading])


    const addTrainer = async (e) => {
        e.preventDefault();
        if (trainerUsername === "") {
            toast.error("Trainer username cannot be left Empty");
            return;
        }
        if (trainingId === "Select Here") {
            toast.error("Please Select the Training name");
            return;
        }
        try {
            const submit = confirm("Are you sure you want to Add Trainer Details ? ");
            if (submit) {
                setTrainerLoading(prev => !prev);
                const response = await axios.post(`${API_URL}/api/admin/addTrainer`, {
                    username: trainerUsername,
                    trainingId
                });
                console.log(response.data);
                if (response.data.success) {
                    toast.success(response.data?.message);

                } else {
                    toast.error(response.data?.message);
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
                setTrainerLoading(prev => !prev);
                setTrainerUsername("");
                setTrainingId("Select Here");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex flex-row">
                <div className="basis-1/5 bg-gray-100 p-5">
                    <SideBar />
                </div>

                <div className="basis-4/5">
                    <div>
                        {
                            admin.role === "superadmin"
                            &&
                            <div className="border mt-10 mx-5 p-10 shadow-lg">
                                <h1 className="text-xl font-semibold pb-5">Add Trainers</h1>
                                <div className="border border-blue-400 rounded py-5 mr-10">
                                    <form>
                                        {trainerLoading ?
                                            <div className="flex justify-center">
                                                <LoaderCircle className="animate-spin duration-200" />
                                            </div>
                                            :
                                            <div>
                                                <div className="flex flex-row">
                                                    <div className="basis-1/4">
                                                        <label className="pl-1 text-md font-semibold">Trainer Username</label>
                                                    </div>
                                                    <div className="basis-2/4 pl-2">
                                                        <input
                                                            type="text"
                                                            className="border py-0.5 px-1 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
                                                            placeholder="Enter trainer username"
                                                            value={trainerUsername}
                                                            onChange={(e) => setTrainerUsername(e.target.value)}
                                                        ></input>
                                                    </div>
                                                    <div className="basis-1/4 mx-4">

                                                    </div>
                                                </div>
                                                <div className="flex flex-row pt-5">
                                                    <div className="basis-1/4">
                                                        <label className="pl-1 text-md font-semibold">
                                                            Training Name
                                                        </label>
                                                    </div>

                                                    <div className="basis-2/4">
                                                        <select
                                                            className="w-full border py-1 rounded px-2 focus:outline-none focus:ring focus:ring-blue-500"
                                                            onChange={e => setTrainingId(e.target.value)}
                                                            value={trainingId}
                                                        >
                                                            <option disabled>Select Here</option>
                                                            {trainings.map((item, index) => (
                                                                <option key={index} value={`${item._id}`}>{item.name}</option>
                                                            ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="basis-1/4">

                                                    </div>

                                                </div>

                                                <div className="pt-5 flex justify-end pr-1">
                                                    <button
                                                        className="border px-4 py-1 bg-blue-500 text-white font-semibold hover:bg-blue-400 rounded"
                                                        onClick={addTrainer}
                                                    >
                                                        Add Trainer
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

export default AddTrainers;