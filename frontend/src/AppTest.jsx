import { Navigate, Route, Routes } from "react-router-dom";
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
import UpdateTrainings from "./pages/UpdateTrainings";
import AddTestPaper from "./pages/AddTestPaper";
import AddTestPaper2 from "./pages/AddTestPaper2";
import ViewTestPaper from "./pages/ViewTestPaper";
import SingleTestPaper from "./pages/SingleTestPaper";
import RichAddTestPaper from "./pages/RichAddTestPaper";
import ViewTrainerDetails from "./pages/ViewTrainerDetails";
import CreateTraining from "./pages/CreateTraining";
import AddTrainers from "./pages/AddTrainers";


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, admin } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to='/' replace />;
    }
    return children;
}

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, admin } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to='/dashboard' replace />
    }
    return children;
}



function AppTest() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;

    return <>
        <Routes>
            <Route
                path='/'
                element={
                    <RedirectAuthenticatedUser>
                        <Login />
                    </RedirectAuthenticatedUser>
                }
            />

            <Route
                path='/dashboard'
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/create-training'
                element={
                    <ProtectedRoute>
                        <CreateTraining/>
                    </ProtectedRoute>
                }
            />

            <Route
                path='/add-trainer'
                element={
                    <ProtectedRoute>
                        <AddTrainers/>
                    </ProtectedRoute>
                }
            />


            <Route
                path='/training/:name/:type'
                element={                    
                        <Training />                    
                }
            />

            <Route
                path='/training-update/:name/:type'
                element={
                    <ProtectedRoute>
                        <UpdateTrainings />
                    </ProtectedRoute>
                }
            />            

            <Route
                path='/add-testpaper/:name/:type'
                element={
                    <ProtectedRoute>
                        <AddTestPaper/>
                    </ProtectedRoute>    
                }
            />

            <Route
                path='/view-testpaper/:name/:type'
                element={
                    <ProtectedRoute>
                        <ViewTestPaper/>
                    </ProtectedRoute>    
                }
            />

            <Route
                path='/view/:name/paper/:paperNo/:testId'
                element={
                    <ProtectedRoute>
                        <SingleTestPaper/>
                    </ProtectedRoute>    
                }
            />

            <Route
                path='/add-testpaper2/:name/:type'
                element={
                    <ProtectedRoute>
                        <AddTestPaper2/>
                    </ProtectedRoute>    
                }
            />

            <Route
                path='/view-trainer/:trainerId'
                element={
                    <ProtectedRoute>
                        <ViewTrainerDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path='/attendance/:userId'
                element={                    
                        <Attendance />                    
                }
            />

            <Route path='/test-paper/:userId'
                element={                    
                        <TestPaper />                    
                }
            />

            <Route
                path='/feedback/:userId'
                element={                    
                        <Feedback />                    
                }
            />

            <Route
                path='/certificate/:userId'
                element={                    
                        <Certificate />                    
                }
            />

            <Route
                path='/update-status/:userId'
                element={
                    <ProtectedRoute>
                        <Update />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </>
}


export default AppTest;