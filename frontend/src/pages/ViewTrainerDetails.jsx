import axios from "axios";
import { ArrowLeftToLine, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import toast from 'react-hot-toast';


function ViewTrainerDetails() {

    const API_URL = "http://localhost:3000";
    const { trainerId } = useParams();
    const [trainingDetails, setTrainingDetails] = useState([]);

    const [trainingDropdown, setTrainingDropdown] = useState([]);
    const [trainingId,setTrainingId]= useState("Select Here");
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/admin/trainerDetails/${trainerId}`)
            .then(response => {
                // console.log(response.data.trainingDetails);
                setTrainingDetails(response.data.trainingDetails);
            }).catch(error => console.log(error));
    }, [isLoading]);

    useEffect(() => {
        axios.get(`${API_URL}/api/admin/trainingDropdown/${trainerId}`)
            .then(response => {
                // console.log(response.data.dropdown);
                setTrainingDropdown(response.data.dropdown);
            }).catch(error => console.log(error));
    }, [isLoading]);

    const handleAddTraining = async(e)=>{
        e.preventDefault();
        if(trainingId === "Select Here"){
            toast.error("Please Select the training name");
            return;           
        }        
        const submit = confirm("Are you sure you want to add the training ?")
        if(submit){
            setIsLoading(prev => !prev);
            try {
                const response = await axios.patch(`${API_URL}/api/admin/addNewTraining/${trainerId}`,{
                    trainingId
                })
                console.log(response.data.message);
                toast.success(response.data.message);                
            } catch (error) {
                console.log(error.message);
            } finally{
                
                setIsLoading(prev => !prev);
                setTrainingId("Select Here");
            }
        }
    }

    return (
        <div>
            <div className="flex justify-center py-2 shadow-lg">
                <h1 className="text-xl">Trainer - {trainingDetails?.[0]?.trainers?.[0]?.username}</h1>
            </div>

            <div className="h-fit border shadow-lg mt-5 mx-5 p-10">
                <div className="pb-5 inline-block">
                    <Link to={`/dashboard`} className="text-blue-500 flex items-center"><ArrowLeftToLine /><span className="text-lg">DASHBOARD</span></Link>
                </div>


                <div className="flex flex-row">
                    <div className="basis-1/2">
                        <h1 className="text-xl font-semibold pb-5">Trainings</h1>
                        {
                            trainingDetails.map((item, index) => (
                                <div key={index} className="pl-10 flex gap-2">
                                    <p>{index+1}.</p>
                                    <p>{item.name}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="basis-1/2">

                        <h1 className="text-xl font-semibold pb-5">Add Trainings</h1>
                        <form>
                            <div className="flex flex-row">
                                <div className="basis-1/3">
                                    <label>
                                        Training Name
                                    </label>
                                </div>
                                <div className="basis-2/3">
                                    <select
                                        className="w-full px-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                                        onChange={e => setTrainingId(e.target.value)}
                                        value={trainingId}
                                    >
                                        <option disabled>Select Here</option>
                                        {
                                            trainingDropdown.map((item, index) => (
                                                <option key={index} value={`${item._id}`}>{item.name}</option>
                                            ))
                                        }
                                    </select>

                                    <div className="pt-5 flex justify-end">
                                        <button 
                                            className="border px-4 bg-blue-500 text-white rounded-full"
                                            onClick={handleAddTraining}
                                        >{isLoading ? <LoaderCircle className="animate-spin"/> : 'Add'} 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>


                </div>




            </div>


        </div>
    )
}

export default ViewTrainerDetails;