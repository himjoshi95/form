import { useAuthStore } from "../store/authStore";


function Navbar(){

    const {admin,logout } = useAuthStore();

    const handleLogout = () =>{
        logout();
    }

    return (
        <div className="sticky top-0 z-50">
            <nav className=" border-b flex justify-between items-center px-5 py-2 bg-emerald-700">
                <h1 className="text-2xl font-semibold text-center text-zinc-100"><i>Trainings</i></h1>
                <div className="flex gap-5 items-center">
                    <p className="text-lg font-semibold text-zinc-100"><i>Welcome Back, {admin.username} !</i></p>
                    <div className="group relative">
                        <div className="w-10 h-10 border border-slate-600 rounded-full flex justify-center items-center bg-slate-600">
                            <p className="text-white">{admin.username.slice(0, 2).toUpperCase()}</p>
                            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                                <div className='min-w-48 h-fit bg-stone-100 rounded flex flex-col gap-5 p-4'>
                                    <p className=" px-2 pb-1  text-gray-400 text-center border-b-2 cursor-pointer hover:text-gray-700">profile</p>
                                    <p onClick={handleLogout} className=" px-2 pb-1 text-gray-400 text-center border-b-2 cursor-pointer hover:text-gray-700">logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;