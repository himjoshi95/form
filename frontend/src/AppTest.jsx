import { Navigate, Route,Routes } from "react-router-dom";
import { useEffect } from "react";

import { useAuthStore } from "./store/authStore";

import Attendance from "./pages/Attendance";
import Certificate from "./pages/Certificate";
import Feedback from "./pages/Feedback";
import HomePage from "./pages/HomePage";
import TestPaper from "./pages/TestPaper";
import Training from "./pages/Training";
import Update from "./pages/Update";
import Login from "./pages/Login";
import LoadingSpinner from "./components/LoadingSpinner";


const ProtectedRoute = ({children}) => {
    const { isAuthenticated, admin} = useAuthStore();

    if(!isAuthenticated){
        return <Navigate to='/' replace/>;
    }
    return children;
}

const RedirectAuthenticatedUser = ({children}) =>{
    const { isAuthenticated,admin } = useAuthStore();

    if(isAuthenticated){
        return <Navigate to='/dashboard' replace/>
    }
    return children;
} 



function AppTest(){
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
		checkAuth();
	}, [checkAuth]);

    if(isCheckingAuth) return <LoadingSpinner/>;

    return <>
        <Routes>

            <Route 
                path='/' 
                element={
                    <RedirectAuthenticatedUser>
                        <Login/>
                    </RedirectAuthenticatedUser>
                }/>

            <Route 
                path='/dashboard' 
                element={
                    <ProtectedRoute>
                        <HomePage/>
                    </ProtectedRoute>
                }/>

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