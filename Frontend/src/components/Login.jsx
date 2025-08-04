import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };

        try {
            const res = await axios.post("http://localhost:4001/user/login", userInfo);
            console.log(res.data);
            if (res.data) {
                toast.success('Logged in Successfully');
                document.getElementById('my_modal_3').close();
                setTimeout(() => {
                    localStorage.setItem("Users", JSON.stringify(res.data.user));
                    navigate('/'); // Navigate to home or dashboard on successful login
                }, 1000);
            }
        } catch (err) {
            if (err.response) {
                console.log(err);
                toast.error("Error: " + err.response.data.message);
            } else {
                console.error("Unexpected Error:", err);
                toast.error('An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => document.getElementById('my_modal_3').close()}
                    >
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <div className='space-y-2'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder='Enter your email'
                                className='w-80 px-3 py-1 border rounded-md outline-none'
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder='Enter your password'
                                className='w-80 px-3 py-1 border rounded-md outline-none'
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
                        </div>
                        <div className='flex justify-between items-center mt-4'>
                            <button type="submit" className='bg-red-500 text-white rounded-md px-3 py-1 hover:bg-red-700 duration-200'>
                                Login
                            </button>
                            <p>
                                Not Registered?{" "}
                                <Link to="/signup" className='underline text-blue-500 cursor-pointer'>
                                    Signup
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default Login;
