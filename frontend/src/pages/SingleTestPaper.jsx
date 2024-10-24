import axios from "axios";
import { ArrowLeftToLine, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function SingleTestPaper() {

    const [test, setTest] = useState({});
    const { name, paperNo, testId } = useParams();
    const [trainingId, setTrainingId] = useState("");
    const [user, setUser] = useState('');
    const API_URL = "http://localhost:3000";

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/testPaper/single/${testId}`)
            .then(response => {
                // console.log(response.data);
                setTrainingId(response.data.training);
                setTest(response.data);
            })
            .catch(error => console.log(error))
    }, [loading])

    useEffect(() => {
        if (trainingId) {
            axios.get(`${API_URL}/api/admin/check-training/${trainingId}`)
                .then(response => {
                    // console.log(response.data);
                    setUser(response.data.message);
                })
                .catch(error => {                    
                    console.log(error.message)                    
                })
        }
    }, [trainingId]);

    const handleDelete = async (testId, sectionId, questionId) => {
        const submit = confirm("Are you sure you want to delete ?")
        if (submit) {
            setLoading(prevValue => !prevValue);
            const response = await axios.delete(`${API_URL}/api/testPaper/deleteQuestion/${testId}/${sectionId}/${questionId}`);
            setLoading(prevValue => !prevValue);
            toast.success("Deleted Successfully");
        } else {
            console.log("Rejected the Deletion");
        }
    }
    
    return (
        <div>
            <div className="flex justify-center border py-5 mt-2 shadow-lg">
                {
                    user === "Valid User"
                    &&
                    <h1 className="text-md font-medium">{name.toUpperCase()} - PAPER {paperNo}</h1>
                }

            </div>

            <div className="h-fit border shadow-lg mt-5 mx-5 p-10">
                {
                    user === "Valid User"
                        ?
                        <div>
                            <div className="pb-5">
                                <Link to={`/view-testpaper/${name}/${test?.training}`} className="text-blue-500 flex items-center"><ArrowLeftToLine /><span className="text-lg">TEST PAPER DASHBOARD</span></Link>
                            </div>
                            {
                                test.sections?.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className="border mb-5 p-2">
                                        <div className="flex justify-center">
                                            <p className="font-bold text-xl pb-5 underline">{section.sectionTitle}</p>
                                        </div>
                                        <div>
                                            {/* {JSON.stringify(section.questions)} */}

                                            {section.questions.map((item, index) => (
                                                <div key={index} className="py-5 border-b border-b-blue-200">
                                                    {item.type === 'MCQ' ?
                                                        <div>
                                                            <div className="text-lg flex justify-between items-start">
                                                                <div className="flex gap-2">
                                                                    <div className="font-bold">
                                                                        <span className="text-lg">Q.</span>{index + 1}
                                                                    </div>
                                                                    <div dangerouslySetInnerHTML={{ __html: item.mcq.question }}></div>
                                                                </div>
                                                                <div className="flex gap-5">
                                                                    <button className="text-blue-300 hover:text-blue-500" ><Pencil className="size-5" /></button>
                                                                    <button className="text-red-300 hover:text-red-500" onClick={() => handleDelete(`${testId}`, `${section._id}`, `${item._id}`)} ><Trash2 className="size-5" /></button>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {item.mcq.options.map((option, index) => (
                                                                    <div key={index}><span className="font-bold">Option {index + 1}:</span> {option}</div>
                                                                ))}
                                                            </div>
                                                            <div className="pt-2">
                                                                <p><span className="font-bold">Correct Answer: {item.mcq.correctAnswer}</span></p>
                                                                <p><span className="font-bold">Maximum Marks: {item?.mcq?.maxMarks || 2}</span></p>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div>
                                                            <div className="flex justify-between">
                                                                <div className="flex gap-3">
                                                                    <div>
                                                                        <span className="font-bold">
                                                                            <span className="text-lg">Q.</span>{index + 1}
                                                                        </span>
                                                                    </div>
                                                                    <div dangerouslySetInnerHTML={{ __html: item.shortAnswer.question }}></div>
                                                                    <div>
                                                                        <p className="font-bold">(SHORT ANSWER)</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-5">
                                                                    <button className="text-blue-300 hover:text-blue-500" ><Pencil className="size-5" /></button>
                                                                    <button className="text-red-300 hover:text-red-500" ><Trash2 className="size-5" onClick={() => handleDelete(`${testId}`, `${section._id}`, `${item._id}`)} /></button>
                                                                </div>
                                                            </div>
                                                            <div className="pt-2">
                                                                <p className="font-bold">Maximum Marks: {item?.shortAnswer?.maxMarks || 5}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            }
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



export default SingleTestPaper;