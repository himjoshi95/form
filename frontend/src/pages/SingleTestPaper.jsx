import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleTestPaper() {

    const [test,setTest] = useState({});
    const { name, paperNo,testId } = useParams();
    const API_URL = "http://localhost:3000";

    useEffect(()=>{
        axios.get(`${API_URL}/api/testPaper/single/${testId}`)
        .then(response => {
            console.log(response.data)
            setTest(response.data)
        })
        .catch(error => console.log(error))
    },[])

    return (
        <div>
            <div className="flex justify-center border py-5 mt-2 shadow-lg">
                <h1 className="text-md font-medium">{name.toUpperCase()} - PAPER {paperNo}</h1>
            </div>

            <div className="h-fit border shadow-lg mt-5 mx-5 p-10">
                {/* { JSON.stringify(test.sections)} */}
                {
                    test.sections?.map((section,sectionIndex)=>(
                        <div key={sectionIndex} className="border mb-5 p-2">
                            <p className="font-bold text-lg pb-5">{section.sectionTitle}</p>
                            <div>
                               {/* {JSON.stringify(section.questions)} */}

                               {section.questions.map((item,index)=>(
                                <div key={index} className="py-5 border-b">
                                    {item.type === 'MCQ' ? 
                                    <div>
                                        <div className="text-lg">
                                           Q.{index+1} {item.mcq.question}
                                        </div>
                                        <div>
                                            {item.mcq.options.map((option,index)=>(
                                                <div><span className="font-bold">Option {index+1}:</span> {option}</div>
                                            ))}
                                        </div>
                                        <div>
                                            <p><span className="font-bold">Correct Answer: {item.mcq.correctAnswer}</span></p>
                                        </div>
                                    </div>
                                       :
                                    <div>
                                        <div>
                                           Q{index+1} {item.shortAnswer.question} - SHORT ANSWER
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
        </div>
    )
}



export default SingleTestPaper;