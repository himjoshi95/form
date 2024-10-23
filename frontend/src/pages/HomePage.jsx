import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CirclePlus, LoaderCircle, Search, View } from 'lucide-react';
import axios from "axios";
import toast from "react-hot-toast";


import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";


function HomePage() {

    // const [trainingName, setTrainingName] = useState("");
    // const [trainerUsername, setTrainerUsername] = useState("");
    // const [trainings, setTrainings] = useState([]);
    // const [trainers, setTrainers] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [trainerLoading, setTrainerLoading] = useState(false);
    // const [trainingId, setTrainingId] = useState("Select Here");

    // const [users, setUsers] = useState([]);

    const { admin } = useAuthStore();

    // const [filter, setFilter] = useState("");


    const API_URL = "http://localhost:3000";

    // -----GET ALL TRAINERS - WITH DEBOUNCING ----- Added in TrainersAvailable.jsx----
    // useEffect(() => {
    //     try {
    //         const timer = setTimeout(() => {
    //             axios.get(`${API_URL}/api/admin/allTrainers?filter=${filter}`)
    //                 .then(response => {
    //                     // console.log(response.data.allTrainers)
    //                     setTrainers(response.data.allTrainers)
    //                 })
    //                 .catch(error => console.log(error.message));
    //         }, 500);

    //         return () => {
    //             clearTimeout(timer);
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }, [trainerLoading, filter]);


    //------GET ALL TRAIN-INGS ----added in TrainingsAvailable.jsx-----
    // useEffect(() => {
    //     setIsLoading(prev => !prev);
    //     try {
    //         axios.get(`${API_URL}/api/admin/allTrainings`)
    //             .then((response) => {
    //                 // console.log(response.data.trainings)
    //                 setTrainings(response.data.trainings)
    //             })

    //     } catch (error) {
    //         console.log(error.message);
    //     }
    //     setIsLoading(prev => !prev);

    // }, [isLoading])

    //--------GET ALL USERS ------ added in particpants.jsx----
    // useEffect(() => {
    //     try {
    //         axios.get(`${API_URL}/api/user/allUsers`)
    //             .then((response) => {
    //                 // console.log(response.data.existingUsers)
    //                 setUsers(response.data.existingUsers);
    //             }).catch(error => {
    //                 console.log(error)
    //             })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }, [])

    // ------ LOGOUT ----------- recently commented after Navbar.jsx component is built
    // const handleLogout = () => {
    //     logout();
    // }

    // ----- ADD MORE TRAININGS ------------ recently commented part of CreateTraining.jsx
    // const addTrainingSubmit = async (e) => {
    //     e.preventDefault();
    //     if (trainingName === "") {
    //         toast.error("Training Name cannot be left Empty");
    //         return;
    //     }
    //     const submit = confirm("Are you sure you want to add the Training ?");
    //     if (submit) {
    //         setIsLoading(prev => !prev);
    //         const response = await axios.post(`${API_URL}/api/admin/addMaster`, { name: trainingName })
    //         // console.log(response.data);
    //         await new Promise(resolve => setTimeout(resolve, 1000));
    //         setIsLoading(prev => !prev);
    //         toast.success(response.data?.message)
    //         setTrainingName("");
    //     }
    // }

    //--------ADD MORE TRAINER ----------- recently commented part of AddTrainer.jsx
    // const addTrainer = async (e) => {
    //     e.preventDefault();
    //     if (trainerUsername === "") {
    //         toast.error("Trainer username cannot be left Empty");
    //         return;
    //     }
    //     if (trainingId === "Select Here") {
    //         toast.error("Please Select the Training name");
    //         return;
    //     }
    //     try {
    //         const submit = confirm("Are you sure you want to Add Trainer Details ? ");
    //         if (submit) {
    //             setTrainerLoading(prev => !prev);
    //             const response = await axios.post(`${API_URL}/api/admin/addTrainer`, {
    //                 username: trainerUsername,
    //                 trainingId
    //             });
    //             console.log(response.data);
    //             if (response.data.success) {
    //                 toast.success(response.data?.message);

    //             } else {
    //                 toast.error(response.data?.message);
    //             }
    //             await new Promise(resolve => setTimeout(resolve, 1000));
    //             setTrainerLoading(prev => !prev);
    //             setTrainerUsername("");
    //             setTrainingId("Select Here");
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };
    return (
        <div>

            <Navbar />           

            <div className="flex flex-row">
                {/* ----START ------------ */}

                {/*----- LEFT SIDE -----*/}
                <div className="basis-1/5 bg-gray-100 p-5">
                    <SideBar/>
                </div>

                {/*----- RIGHT SIDE -----*/}
                <div className="basis-4/5 shrink">

                    <div className="border mt-10 mx-5 p-10 shadow-lg">
                        <h1 className="text-xl font-semibold">Dashboard</h1>

                    </div>

                        {/* CreateTraining.jsx  */}
                    {/* <div>
                        {
                            admin.role === "superadmin"
                            &&
                            <div className="border mt-10 mx-5 p-10 shadow-lg">
                                <h1 className="text-xl pb-5">Create Trainings</h1>
                                <div className="border border-blue-300 rounded py-5 mr-10">
                                    <form>
                                        {isLoading ?
                                            <div className="flex justify-center">
                                                <LoaderCircle className="animate-spin duration-200" />
                                            </div>
                                            :
                                            <div className="flex flex-row">
                                                <div className="basis-1/4 pl-1">
                                                    <label className="text-md font-semibold">Training Name</label>
                                                </div>
                                                <div className="basis-2/4">
                                                    <input
                                                        type="text"
                                                        className="border py-0.5 px-1 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
                                                        placeholder="Enter training name"
                                                        value={trainingName}
                                                        onChange={(e) => setTrainingName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="basis-1/4 mx-4">
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
                    </div> */}

                    {/* ADD TRAINERS */} {/* AddTrainer.jsx  */}
                    {/* <div>
                        {
                            admin.role === "superadmin"
                            &&
                            <div className="border mt-10 mx-5 p-10 shadow-lg">
                                <h1 className="text-xl pb-5">Add Trainers</h1>
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
                    </div> */}

                    {/*-------TRAINERS AVAILABLE -------------Added in TrainersAvailable.jsx   -*/}
                    {/* <div>
                        {
                            admin.role === "superadmin"
                            &&
                            <div className="border mt-10 mx-5 p-10 shadow-lg">
                                <h1 className="text-xl pb-5">Trainers Available</h1>
                                <div className="pb-5">
                                    <div className="w-[400px] border-2 flex items-center px-1 rounded-full overflow-hidden focus-within:border-blue-500">
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
                                    trainerLoading ?
                                        <div className="text-2xl flex justify-center"><LoaderCircle className="animate-spin" /></div>
                                        :
                                        // trainers.length > 0 &&
                                        <div>
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
                                }
                            </div>
                        }
                    </div> */}

                    {/* ----TRAININGS AVAIALABLE -----added in TrainingsAvailable.jsx----- */}
                    {/* <div className=" border mt-10 mx-5 p-10 shadow-lg">
                        <h1 className="text-xl pb-5">Trainings Available</h1>

                        {isLoading ?
                            <div className="text-2xl flex justify-center"><LoaderCircle className="animate-spin" /></div>
                            :
                            // trainings.length > 0 &&
                            <div>
                                <table className="w-full border">
                                    <thead>
                                        <tr>
                                            <th className="border text-center">Sno.</th>
                                            <th className="border text-center">Training Links</th>
                                            <th className="border text-center">Status</th>
                                            <th className="border text-center">Add Test Paper</th>
                                            <th className="border text-center">View Test Paper</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trainings.length > 0 ? (
                                            trainings.map((item, index) => (
                                                <tr key={index} className="border">
                                                    <td className="p-2 border">{index + 1}.</td>
                                                    <td className="p-2 border"><Link className="flex flex-row" to={`/training/${item.name}/${item._id}`}> <span className="basis-1/4">Training - {item.name}</span> <span className="basis-3/4 underline text-blue-500"> {`http://localhost:5173/training/${item.name}/${item._id}`}</span></Link></td>
                                                    <td className="p-2 border"><Link to={`/training-update/${item.name}/${item._id}`} className="text-blue-500 underline" >view/edit</Link></td>
                                                    <td className="p-2 border text-blue-500"><Link className="flex justify-center" to={`/add-testpaper/${item.name}/${item._id}`}><CirclePlus className="hover:bg-blue-500 rounded-full hover:text-white" /></Link></td>
                                                    <td className="p-2 border"><Link className="flex justify-center" to={`/view-testpaper/${item.name}/${item._id}`}><View className="text-blue-500 cursor-pointer" /></Link></td>
                                                </tr>
                                            )
                                            )
                                        )
                                            :
                                            <tr>
                                                <td className="border"></td>
                                                <td className="text-center py-5">No Trainings</td>
                                                <td className="border"></td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div> */}

                    {/*------ ALL PARTICIPANTS --------Added in Participants.jsx-------------*/}
                    {/* <div className=" border mt-10 mx-5 p-10 shadow-lg">
                        <h1 className="text-xl">Participants</h1>
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
                    </div>                     */}
                </div>          
            </div>
        </div>
    )
}


export default HomePage;