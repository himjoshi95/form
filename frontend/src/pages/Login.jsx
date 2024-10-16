import {User, Lock , Loader,Eye,EyeOff} from "lucide-react";

import LoginInput from "../components/LoginInput";
import { useState } from "react";

import { useAuthStore } from "../store/authStore";
import LoginPasswordInput from "../components/LoginPasswordInput";

function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [visible,setVisible] = useState(false);

    const { login, isLoading, error } = useAuthStore();

    const handleLogin = async (e) =>{
        e.preventDefault();
        await login(username,password);
    }

    const handleVisible = () =>{
        setVisible(prev => !prev)        
    }

    return (
        <div className="h-screen bg-slate-100 flex justify-center items-center">
            
            <div className="w-[400px] h-80 bg-gradient-to-br from-gray-800 via-gray-600 to-gray-900 rounded-md">
                <p className="text-orange-500 text-center font-bold text-lg py-5 mb-5">LOGIN</p>

                <form onSubmit={handleLogin}>

                    <LoginInput icon={User} type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    
                    <LoginPasswordInput icon={Lock} eye={visible ? EyeOff:Eye} onClick={handleVisible} type={visible ? 'text':'password'} placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    {error && <p className='text-red-500 font-semibold mb-2 mx-2'>{error}</p>}
                    <div className="px-2">
                        <button type="submit" className="bg-orange-500 w-full text-white text-xl py-2 rounded">
                            {isLoading ? <Loader className="w-6 h-7 animate-spin  mx-auto"/> : "LOGIN"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login;