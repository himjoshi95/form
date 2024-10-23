import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="text-md md:text-lg">
            <Link to="/dashboard" className="w-full">
                <div className="border hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 hover:ring-2 hover:ring-blue-500 duration-200">
                    Dashboard
                </div>
            </Link>
            <Link to="/create-training">
                <div className="border hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 hover:ring-2 hover:ring-blue-500 duration-200">
                    Create Trainings
                </div>
            </Link>
            <Link to="/add-trainer">
                <div className="border hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 hover:ring-2 hover:ring-blue-500 duration-200">
                    Add Trainers
                </div>
            </Link>
            <Link to="/trainers-available">
                <div className="border hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 hover:ring-2 hover:ring-blue-500 duration-200">
                    Trainers
                </div>
            </Link>
            <Link to="/trainings-available">
                <div className="border hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 hover:ring-2 hover:ring-blue-500 duration-200">
                    Trainings
                </div>
            </Link>
            <Link to='/participants'>
                <div className="border hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 hover:ring-2 hover:ring-blue-500 duration-200">
                    Participants
                </div>
            </Link>
        </div>
    )
}

export default SideBar;