import React from 'react';
import { useAuth } from '../Context/AuthProvider';
import toast from 'react-hot-toast';

function Logout() {
    const [authUser, setAuthUser] = useAuth();

    const handleLogout = () => {
        try {
            // Clear user information from authUser
            setAuthUser(null);
            localStorage.removeItem('Users');
            toast.success("Logout Successfully");
                setTimeout(()=>{
                    window.location.reload();
                },2000)
                // Reloading the page to reflect logout state
        } catch (error) {
            toast.error("Error: " + error);
            setTimeout(()=>{},2000)
        }
    };

    return (
        <div>
            <button
                className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Logout;
