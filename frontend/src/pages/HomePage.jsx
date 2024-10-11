import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



function HomePage() {

    const [trainings, setTrainings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [users,setUsers] = useState([]);


    const API_URL = "http://localhost:3000";

    useEffect(() => {
        setIsLoading(true);
        try {
            axios.get(`${API_URL}/api/admin/allTrainings`)
                .then((response) => {
                    // console.log(response.data.trainings)
                    setTrainings(response.data.trainings)
                })

        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(false);

    }, [])

    useEffect(()=>{
        try {
            axios.get(`${API_URL}/api/user/allUsers`)
            .then((response)=>{
                // console.log(response.data.existingUsers)
                setUsers(response.data.existingUsers);
            }).catch(error =>{
                console.log(error)
            })            
        } catch (error) {
            console.log(error.message)
        }
    },[])
    return <div>
        <nav className="border-b h-10 flex justify-center">
            <h1 className="text-xl">Trainings</h1>
        </nav>
        <div className=" border mt-10 mx-5 p-10">

            <h1 className="text-xl pb-5">Trainings Available</h1>


            {/* {
                trainings.map((item,index) =>{
                    <div>
                        <Link to={`/training/${item.name}`}>{item.name}</Link>
                    </div>
                })               
                }
                 */}


            {isLoading && <div className="text-2xl">Loading...</div>}
            {trainings.length > 0 &&
                <div className="flex flex-col gap-2">
                    {/* <div>
                    <Link to={`/training/${trainings[0]._id}`} className="underline text-blue" >Trainings - {trainings[0].name}</Link>
                </div>
                <div>
                    <Link to={`/training/${trainings[1]._id}`} className="underline text-blue" >Trainings - {trainings[1].name}</Link>
                </div>
                <div>
                    <Link to={`/training/${trainings[2]._id}`} className="underline text-blue" >Trainings - {trainings[2].name}</Link>
                </div>
                <div>
                    <Link to={`/training/${trainings[3]._id}`} className="underline text-blue" >Trainings - {trainings[3].name}</Link>             
                </div> */}
                </div>

            }

            {
                trainings.map((item, index) => <div className="py-2" key={index}>
                    <Link className="flex flex-row" to={`/training/${item.name}/${item._id}`}> <span className="basis-1/4">Training - {item.name}</span> <span className="basis-3/4 underline text-blue-500">{`http://localhost:5173/training/${item.name}/${item._id}`}</span></Link>
                </div>)
            }

        </div>

        <div className=" border mt-10 mx-5 p-10">
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
                        users.map((item,index) => (
                            <tr key={index} className="border">
                                <td className="p-2 border">{index+1}.</td>
                                <td className="p-2 border">{item.title.slice(0,1)}{item.title.slice(1).toLowerCase()}  {item.firstName} {item.lastName}</td>
                                <td className="p-2 border">{item.trainingId.name}</td>
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