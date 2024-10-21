import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CirclePlus, LoaderCircle, View } from 'lucide-react';
import axios from "axios";
import toast from "react-hot-toast";


import { useAuthStore } from "../store/authStore";

function HomePage() {

    const [trainingName,setTrainingName] = useState("");
    const [trainings, setTrainings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([]);

    const { admin, logout } = useAuthStore();


    const API_URL = "http://localhost:3000";

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

    useEffect(() => {
        try {
            axios.get(`${API_URL}/api/user/allUsers`)
                .then((response) => {
                    // console.log(response.data.existingUsers)
                    setUsers(response.data.existingUsers);
                }).catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    const handleLogout = () => {
        logout();
    }

    const addTrainingSubmit = async (e) => {
        e.preventDefault();
        const submit = confirm("Are you sure you want to add the Training ?");
        if (submit) {
            setIsLoading(prev => !prev);
            const response = await axios.post(`${API_URL}/api/admin/addMaster`,{name:trainingName})
            console.log(response.data);
            await new Promise(resolve => setTimeout(resolve,1000));
            setIsLoading(prev => !prev);
            toast.success("Created") 
            setTrainingName("");           
        }
    }
    return <div>
        <nav className="sticky top-0 z-50 border-b flex justify-between items-center px-5 py-2 bg-emerald-700">
            <h1 className="text-2xl font-semibold text-center text-zinc-100"><i>Trainings</i></h1>
            <div className="flex gap-5 items-center">
                <p className="text-lg font-semibold text-zinc-100"><i>Welcome, {admin.username} </i>!</p>
                <div className="group relative">
                    <div className="w-10 h-10 border border-slate-600 rounded-full flex justify-center items-center bg-slate-600">
                        <p className="text-white">{admin.username.slice(0, 2).toUpperCase()}</p>
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                            <div className='min-w-48 h-fit bg-stone-100 rounded flex flex-col gap-5 p-4'>
                                <p className=" px-2 pb-1  text-gray-400 text-center border-b-2 cursor-pointer hover:text-gray-700">profile</p>
                                <p onClick={handleLogout} className=" px-2 pb-1 text-gray-400 text-center border-b-2 cursor-pointer hover:text-gray-700">logout</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button onClick={handleLogout} className="border px-2 rounded-full bg-black text-white hover:bg-slate-700 py-1">logout</button> */}
            </div>
        </nav>

        <div>
            {
                admin.role === "superadmin"
                &&
                <div className="border mt-10 mx-5 p-10 shadow-lg">
                    <h1 className="text-xl pb-2">Create Trainings</h1>
                    <div className="border py-5">
                        <form>
                            {isLoading ? 
                            <div className="flex justify-center">
                                <LoaderCircle className="animate-spin duration-200"/>
                            </div>
                            :
                            <div className="flex flex-row">
                                <div className="basis-1/4 pl-1">
                                    <label className="text-lg font-semibold">Training Name</label>
                                </div>
                                <div className="basis-2/4">
                                    <input
                                        type="text"
                                        className="border py-0.5 px-1 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
                                        value={trainingName}
                                        onChange ={(e)=>setTrainingName(e.target.value)}
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
        </div>
        <div className=" border mt-10 mx-5 p-10 shadow-lg">
            {/* {JSON.stringify(admin)} */}
            <h1 className="text-xl pb-5">Trainings Available</h1>


            {/* {
                trainings.map((item,index) =>{
                    <div>
                        <Link to={`/training/${item.name}`}>{item.name}</Link>
                    </div>
                })               
                }
                 */}


            {isLoading  ?  
            <div className="text-2xl flex justify-center"><LoaderCircle className="animate-spin"/></div>
            :
            trainings.length > 0 && 
            <div>
                <table className="w-[1100px] border">
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
                                <td className="p-2 border">{index + 1}</td>
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

            

            {/* {
                trainings.map((item, index) => <div className="py-2" key={index}>
                    <Link className="flex flex-row" to={`/training/${item.name}/${item._id}`}> <span className="basis-1/4">Training - {item.name}</span> <span className="basis-3/4 underline text-blue-500">{`http://localhost:5173/training/${item.name}/${item._id}`}</span></Link>
                </div>)
            } */}

        </div>

        <div className=" border mt-10 mx-5 p-10 shadow-lg">
            {/* {JSON.stringify(users)} */}
            <h1 className="text-xl">Participants</h1>
            <div className="pt-10">
                <table className="w-[1100px] border">
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


                        {/* <tr className="border">
                            <td className="p-2">Witchy Woman</td>
                            <td className="p-2">PHP</td>
                            <td className="p-2">http://localhost:5173/training/</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2">Shining Star</td>
                            <td className="p-2">Full Stack Dev</td>
                            <td className="p-2">http://localhost:5173/training/</td>
                        </tr> */}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
}


export default HomePage;