import Attendance from "./pages/Attendance";
import Certificate from "./pages/Certificate";
import Feedback from "./pages/Feedback";
import HomePage from "./pages/HomePage";
import TestPaper from "./pages/TestPaper";
import Training from "./pages/Training";
import Update from "./pages/Update";
import Login from "./pages/Login";
import { Route,Routes } from "react-router-dom";



function AppTest(){
    return <>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<HomePage/>}/>
            <Route path='/training/:name/:type' element={<Training/>}/>
            <Route path='/attendance/:userId' element={<Attendance/>}/>
            <Route path='/test-paper/:userId' element={<TestPaper/>}/>
            <Route path='/feedback/:userId' element={<Feedback/>}/>            
            <Route path='/certificate/:userId' element={<Certificate/>}/>  
            <Route path='/update-status/:userId' element={<Update/>}></Route>           
        </Routes>
    </>
}


export default AppTest;