import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    await axios.post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success('Signup Successfully');
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }).catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className='flex h-screen items-center justify-center'>
        <div className="w-[500]">
          <div className="model-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Signup</h3>
                <Link to="/" className="btn btn-sm btn-circle btn-ghost">✕</Link>
              </div>

              <div className='mt-4 space-y-2'>
                <label htmlFor="fullname" className="block">Name</label>
                <input
                  type="text"
                  id="fullname"
                  placeholder='Enter your full name'
                  className='w-full px-3 py-1 border rounded-md outline-none'
                  {...register("fullname", {
                    required: "Name is required",
                    validate: {
                      noNumberStart: (value) => /^[^\d]/.test(value) || "Name cannot start with a number"
                    }
                  })}
                />
                {errors.fullname && <span className='text-sm text-red-500'>{errors.fullname.message}</span>}
              </div>

              <div className='mt-4 space-y-2'>
                <label htmlFor="email" className="block">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder='Enter your email'
                  className='w-full px-3 py-1 border rounded-md outline-none'
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
              </div>

              <div className='mt-4 space-y-2'>
                <label htmlFor="password" className="block">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder='Enter your password'
                  className='w-full px-3 py-1 border rounded-md outline-none'
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
              </div>

              <div className='flex justify-around mt-4'>
                <button type="submit" className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>
                  Signup
                </button>
                <p className='text-xl'>Have an Account?</p>
                <button
                  type="button"
                  className='underline text-blue-500 cursor-pointer'
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  Login
                </button>
              </div>
            </form>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
