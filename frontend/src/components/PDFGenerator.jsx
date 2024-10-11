import axios from "axios";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";


const PDFGenerator = ({userId}) => {

    // console.log(userId)
    const [name,setName] = useState("");
    const [course,setCourse] = useState("");
    const [score,setScore] = useState("");

    const API_URL = "http://localhost:3000";

    const fetchData = async () =>{
        try {
            const response = await axios.get(`${API_URL}/api/user/certificate?userId=${userId}`);
            const participantName = `${response.data.userDetails.title.slice(0,1)}${response.data.userDetails.title.slice(1).toLowerCase()} ${response.data.userDetails.firstName} ${response.data.userDetails.lastName}`

            setName(participantName);
            setCourse(response.data.trainingDetails.name);
            const percentile = JSON.stringify(response.data.percentile);
            setScore(percentile);

        } catch (error) {
            console.log("Error in fetching data", error);
        }
    };

    useEffect(()=>{
        fetchData();
    },[userId])

    const generatePDF = () => {
        const doc = new jsPDF();
        // Add text to the PDF
        doc.text("Training Certificate", 80, 10);
        // Save the generated PDF
        doc.text("Name ",10,30);
        doc.text(`${name}`,50,30);
        doc.text("Course ",10,40);
        doc.text(`${course}`,50,40);
        doc.text("Percentile ",10,50);
        doc.text(`${score} %`,50,50);
        // doc.save("certificate.pdf");

        const pdfUrl = doc.output("bloburl");
        window.open(pdfUrl);
    };

    return (
        <div>
            <button className="border py-2 px-1 bg-red-300 text-white hover:bg-red-500" onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};

export default PDFGenerator;
