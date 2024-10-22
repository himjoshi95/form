import axios from "axios";
import { ArrowLeftToLine, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function ViewTestPaper() {
    const { name, type } = useParams();
    const [user, setUser] = useState();

    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:3000";

    useEffect(() => {
        axios.get(`${API_URL}/api/testPaper/?type=${type}`)
            .then(response => {
                // console.log(response.data);
                setTests(response.data);
            })
            .catch(err => console.log(err))
    }, [loading]);

    useEffect(() => {
        axios.get(`${API_URL}/api/admin/check-training/${type}`)
            .then(response => {
                console.log(response.data);
                setUser(response.data.message);
            })
            .catch(error => console.log(error))
    }, []);



    const handleDelete = async (testId) => {

        const submit = confirm("Are you sure you want to delete ?")
        if (submit) {
            // console.log(submit,testId)
            setLoading(prev => !prev);
            const response = await axios.delete(`${API_URL}/api/testPaper/deleteTestPaper/${testId}`)
            console.log(response.data)
            setLoading(prev => !prev);
        }
    }

    return (
        <div>
            <div className="flex justify-center border py-5 mt-2 shadow-lg">
                {
                    user === "Valid User"
                    &&
                    <h1 className="text-md font-medium">{name.toUpperCase()} - VIEW TEST PAPER</h1>
                }
            </div>

            <div className="h-fit border shadow-lg mt-5 mx-5 p-10">
                {
                    user === "Valid User"
                        ?
                        <div>
                            <div className="pb-5">
                                <Link to={`/dashboard`} className="text-blue-500 flex items-center"><ArrowLeftToLine /><span className="text-lg">DASHBOARD</span></Link>
                            </div>

                            <div className="grid grid-cols-2 gap-10 md:grid-cols-5 md:gap-5">
                                {tests.length > 0 ? tests.map((test, index) => (
                                    <div key={index} className="border h-44 rounded-lg  shadow-lg" >
                                        <div className="p-5 h-full">
                                            <Link to={`/view/${name}/paper/${index + 1}/${test._id}`} className="text-white">
                                                <div className="flex justify-center items-center bg-blue-400 h-full rounded hover:bg-blue-600 cursor-pointer">
                                                    Paper {index + 1}
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="flex justify-center mt-3">
                                            {/* <Link to={`/view/${name}/paper/${index+1}/${test._id}`} className="text-blue-500 underline">view </Link> */}
                                            <button
                                                className="flex items-center gap-2 border px-2 rounded-full hover:border-red-500 text-red-300 hover:text-red-500 duration-200"
                                                onClick={() => handleDelete(`${test._id}`)}
                                            > Delete <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                                    :
                                    <div className="col-span-5 flex justify-center">
                                        <p className="text-xl text-gray-700 font-semibold border border-red-500 p-2 rounded-lg">No Test Paper Added</p>
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <div className="h-80 flex justify-center items-center">
                            <p className="border border-red-500 p-2 rounded text-xl font-semibold text-gray-700">404 Page Not Found</p>
                        </div>
                }


            </div>
        </div>
    )

}

export default ViewTestPaper;