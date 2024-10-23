import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div>
            <div className="border text-lg hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 duration-200">
                <Link to="/dashboard">
                    Dashboard
                </Link>
            </div>
            <div className="border text-lg hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 duration-200">
                <Link to="/create-training">
                    Create Trainings
                </Link>
            </div>
            <div className="border text-lg hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 duration-200">
                <Link to="/add-trainer">
                    Add Trainers
                </Link>
            </div>
            <div className="border text-lg hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 duration-200">
                <Link to="/trainers-available">
                    Trainers 
                </Link>
            </div>
            <div className="border text-lg hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 duration-200">
                <Link to="/trainings-available">Trainings</Link>
            </div>
            <div className="border text-lg hover:font-semibold p-1 mb-2 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 duration-200">Participants</div>
        </div>
    )
}

export default SideBar;