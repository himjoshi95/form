import { useEffect, useState } from "react"
import axios from "axios";

import Label from "./components/Label";
import InputBox from "./components/InputBox";

import toast  from "react-hot-toast";
import {Loader} from "lucide-react";
import InputBoxNumber from "./components/InputBoxNumber";
import EmailInput from "./components/EmailInput";


function App() {
  const [title,setTitle] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [mobile,setMobile] = useState("");
  const [email,setEmail] = useState("");
  const [designation,setDesignation] = useState("");
  const [company,setCompany] = useState("");
  const [industry,setIndustry] = useState("");
  const [city,setCity] = useState("");

  const [isLoading,setIsLoading] = useState(false);
  
  const [error,setError] = useState(null);
  const [ emailError,setEmailError] = useState("");

  const API_URL = "http://localhost:3000";
  

  useEffect(()=>{
    axios.get(`${API_URL}/api/user/searchMobile?filter=${mobile}`)
    .then((response) => {
      console.log(response.data?.message)
      setError(response.data?.message)
    }).catch((error)=>{
      console.log(error)
    })
  },[mobile])

  // useEffect(()=>{
  //   axios.get(`${API_URL}/api/user/filterEmail?filter=${email}`)
  //   .then((response) => {
  //     console.log(response.data?.message)
  //     setEmailError(response.data?.message)
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // },[email])


  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate email format
    if (!emailRegex.test(emailValue)) {
        setEmailError("Invalid email format");
    } 
    else {
        setEmailError("");
    }
};

  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    try {
      if(title==='Select Title' 
        || firstName === "" 
        || lastName=== "" 
        || mobile==="" 
        || email==="" 
        || designation === "" 
        || company ===""
        || industry === ""){
          toast.error("All Input fields are required")

        }else if(error){
          toast.error("Mobile Number Already Exists");
        } else if(emailError){
          toast.error("Enter valid Email")
        }    
        else{
          setIsLoading(val => !val);
          // await new Promise(r=>setTimeout(r,2000));
          const response = await axios.post(`${API_URL}/api/user/form`,{
            title,
            firstName,
            lastName,
            mobile,
            email,
            designation,
            company,
            industry,
            city
          });
    
          console.log(response.data)          
          setIsLoading(val => !val)
          toast.success("Form Submitted Successfully")

          setTitle("");
          setFirstName("");
          setLastName("");
          setMobile("");
          setEmail("");
          setDesignation("");
          setCompany("");
          setIndustry("");
          setCity("");
        }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-slate-200 px-2">
        <div className="bg-white p-2 flex justify-center items-end h-24" >
            <h1 className="text-xl w-full text-center pb-1">Participants Details</h1>
        </div>

        <div className="bg-white mt-5 py-3 px-2">
          <form onSubmit={handleSubmit}>
          
          {/* Form row 1 */}
          <div className="flex flex-row pb-5">
            <Label label={"Title"}/>
            <select className="basis-3/4 border-b text-sm focus:outline-none" value={title} onChange={(e)=>setTitle(e.target.value)} >
                <option value="Select Title">Select Title</option>
                <option value="MR">MR</option>
                <option value="MRS">MRS</option>
                <option value="MS">MS</option> 
            </select>
          </div>

          {/* Form row 2 */}
          <div className="flex flex-row pb-5">
            <Label label={"First Name"}/>
            <div className="basis-3/4 border-b text-sm">
            <InputBox type="text" value={firstName} placeholder={"First Name"} onChange={(e)=>setFirstName(e.target.value)} />
            </div>
          </div>

          {/* Form row 3 */}
          <div className="flex flex-row pb-5">
            <Label label={"Last Name"}/>
            <div className="basis-3/4 border-b text-sm">
            <InputBox type="text" value={lastName} placeholder={"Last Name"} onChange={(e)=>setLastName(e.target.value)} />
            </div>
          </div>

          {/* Form row 4 */}
          <div className="flex flex-row pb-5">
            <Label label={"Mobile"}/>
            <div className="basis-3/4 border-b text-sm">
            <InputBoxNumber type="number"  value={mobile} placeholder={"10 Digits Mobile Number"} onChange={(e)=>setMobile(e.target.value)} />
            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
            </div>
          </div>

          {/* Form row 5 */}
          <div className="flex flex-row pb-5">
            <Label label={"Email"}/>
            <div className="basis-3/4 border-b text-sm">
            <EmailInput type="text" value={email} placeholder={"Email"} onChange={handleEmailChange} />
           {/* {emailError && <p className='text-red-500 font-semibold mt-2'>{emailError}</p>} */}
            </div>
          </div>

          {/* Form row 6 */}
          <div className="flex flex-row pb-5">
            <Label label={"Designation"}/>
            <div className="basis-3/4 border-b text-sm">
            <InputBox type="text" value={designation} placeholder={"Designation"} onChange={(e)=>setDesignation(e.target.value)} />
            </div>
          </div>

          

          {/* Form row 7  */}
          <div className="flex flex-row pb-5">
            <Label label={"Company"}/>
            <div className="basis-3/4 border-b text-sm">
            <InputBox type="text" value={company} placeholder={"Company"} onChange={(e)=>setCompany(e.target.value)} />
            </div>
          </div>

          {/* Form row 8 */}
          <div className="flex flex-row pb-5">
            <Label label={"Industry"}/>
            <select className="basis-3/4 border-b text-sm focus:outline-none" value={industry} onChange={(e)=>setIndustry(e.target.value)} >
                <option value="Select Title">Please Select</option>
                <option value="Paper & Pulp Industry">Paper & Pulp Industry</option>
                <option value="Steel-Foundary">Steel-Foundary</option>
                <option value="Steel-Forging">Steel-Forging</option> 
                <option value="Steel-Re Rolling">Steel-Re Rolling</option> 
                <option value="Others">Others</option> 
            </select>
          </div>

          {/* Form row 9 */}
          <div className="flex flex-row pb-5">
            <Label label={"City"}/>
            <div className="basis-3/4 border-b text-sm">
            <InputBox type="text" value={city} placeholder={"City"} onChange={(e)=>setCity(e.target.value)} />
            </div>
          </div>


          <div className=" pl-20 pt-2">
            <button type="submit" className="border px-2 py-1 bg-red-400 text-white">
              {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' />: "Submit"}
             
              </button>
          </div>
          </form>

          {/* <p>
            Data: {title} {firstName} {lastName} {mobile} {email} {designation} {company} {industry} {city}
          </p> */}

        </div>
      </div>
    </>
  )
}

export default App
