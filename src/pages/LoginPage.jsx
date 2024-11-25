import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { addAuthUsers } from "../store/slice/usersSlice.js";

import instance from "../axios/axiosPublic";
import { GuestPage } from "../guard/GuestPage.jsx";

const LoginPage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = await instance.post("/login", {
            email: formik.values.email,
            password: formik.values.password
        });

        const decoded = jwtDecode(data.data.accessToken);

        let dataAuthUser = {
          id: decoded.userId,
          name: decoded.name,
          email: decoded.email,
          accessToken: data.data.accessToken
        }
        
        dispatch(addAuthUsers({accessToken: data.data.accessToken}))
        localStorage.setItem("users", JSON.stringify(dataAuthUser))

        navigate("/") // redirect to home
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: handleLogin,
        validationSchema: yup.object({
            email: yup.string().required("Email is required").email("Please enter a valid email address"),
            password: yup.string().required()
            // password: yup.string().required().matches(
            //     /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
            //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            // )
        })
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
        // formik.setFieldValue("email", "value@mail.com");
    }

    return (
        <GuestPage>
            <main className="bg-gray-100 flex items-center justify-center min-h-screen">
                {/* new login form */}
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center text-primary mb-2">Login</h2>
                    <p className="text-center text-gray-500 mb-6">Welcome to our wedding site</p>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                onChange={handleForm}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@mail.com"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {
                                formik.errors.email && <p>{formik.errors.email}</p>
                            }
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                                <a href="#" className="text-sm text-primary hover:underline">Forgot?</a>
                            </div>
                            <input
                                onChange={handleForm}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {
                                formik.errors.password && <p>{formik.errors.password}</p>
                            }
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary-dark transition mt-4"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-sm mt-6">
                    Don’t have an account? <Link to="/register" className="text-primary font-medium hover:underline hover:text-primary-dark">Register</Link>
                    </p>
                </div>
                
            </main>
        </GuestPage>
    )
}

export default LoginPage