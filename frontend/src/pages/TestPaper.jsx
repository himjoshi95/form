import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function TestPaper() {

    const { userId } = useParams();
    const [firstName, setFirstName] = useState('');
    const navigate = useNavigate();

    const API_URL = "http://localhost:3000";

    useEffect(() => {
        axios.get(`${API_URL}/api/user/userDetails?filter=${userId}`)
            .then(response => {
                // console.log(response.data)
                setFirstName(response.data.desiredUser.firstName)
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = async() =>{
        const submit = confirm("Do you want to submit the Test ?");
        if(submit){
            const response  = await axios.post(`${API_URL}/api/user/testDetails`,{userId});
            console.log(response.data);
            toast.success("Test Submitted Successfully")
            await new Promise(r=>setTimeout(r,1000))
            navigate(`/feedback/${userId}`)           
        }
    }
    return <div>
        <div className="flex justify-center border py-2 mt-2 shadow-lg">
            <h1 className="text-md font-medium">TEST PAPER - {firstName.length > 0 && firstName}</h1>
        </div>

        <div className=" mt-5 mx-5 flex flex-col gap-5">
            <div className="border py-5 mt-2 mx-2 shadow-md">
                <div className="px-2">
                    <p>Q1. In a relational database, SQL is used to define, manipulate, and query data.</p>
                    <div className="flex gap-5 pl-5 pt-2">
                        <div>
                        <input type="radio"  name="drone" value="True" />
                        <label >True</label>
                        </div>
                        <div>
                        <input type="radio"  name="drone" value="False"  />
                        <label >False</label>
                        </div>
                    </div>                    
                </div>
            </div>

            <div className="border py-5 mt-2 mx-2 shadow-md">
                <div className="px-2">
                    <p>Q2 The Time Complexity of binary search in a sorted array is O(n).</p>
                    <div className="flex gap-5 pl-5 pt-2">
                        <div>
                        <input type="radio"  name="drone" value="True" />
                        <label >True</label>
                        </div>
                        <div>
                        <input type="radio"  name="drone" value="False"  />
                        <label >False</label>
                        </div>
                    </div> 
                </div>
            </div>

            <div className="border py-5 mt-2 mx-2 shadow-md">
                <div className="px-2">
                    <p>Q3 JavaScript is a statically typed programming language.</p>
                    <div className="flex gap-5 pl-5 pt-2">
                        <div>
                        <input type="radio"  name="drone" value="True" />
                        <label >True</label>
                        </div>
                        <div>
                        <input type="radio"  name="drone" value="False"  />
                        <label >False</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border py-5 mt-2 mx-2 shadow-md">
                <div className="px-2">
                    <p>Q4 In object-oriented programming, inheritance allows a class to inherit properties and methods from another class.</p>
                    <div className="flex gap-5 pl-5 pt-2">
                        <div>
                        <input type="radio"  name="drone" value="True" />
                        <label >True</label>
                        </div>
                        <div>
                        <input type="radio"  name="drone" value="False"  />
                        <label >False</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border py-5 mt-2 mx-2 shadow-md">
                <div className="px-2">
                    <p>Q5 In computer networks, a firewall is used to block unauthorized access to or from a private network.</p>
                    <div className="flex gap-5 pl-5 pt-2">
                        <div>
                        <input type="radio"  name="drone" value="True" />
                        <label >True</label>
                        </div>
                        <div>
                        <input type="radio"  name="drone" value="False"  />
                        <label >False</label>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        <div className="py-5 flex justify-end px-5">
            <button onClick={handleSubmit} className="border px-3 py-2 bg-red-500 text-white">Sumit</button>
        </div>
    </div>
}

export default TestPaper;