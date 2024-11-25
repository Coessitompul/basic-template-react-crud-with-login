import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';

import instance from "../axios/axiosPublic";
import { GuestPage } from "../guard/GuestPage.jsx";

const RegisterPage = () => {

    const navigate = useNavigate();

    const handleRegister = async () => {
        const response = await instance.post("/register", {
            name: formik.values.name,
            email: formik.values.email,
            password: formik.values.password,
            confirmPassword: formik.values.confirmPassword
        });
        
        alert("Pendaftaran Berhasil");

        navigate("/login")
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: handleRegister,
        validationSchema: yup.object({
            name: yup.string().required("Nama tidak boleh kosong"),
            email: yup
              .string()
              .required("Email is required")
              .email("Please enter a valid email address"),
            password: yup
              .string()
              .required("Password is required")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must contain 8 characters, one uppercase, one lowercase, one number, and one special case character"
              ),
            confirmPassword: yup
              .string()
              .oneOf([yup.ref("password"), null], "Confirm Password harus sama dengan 'Password'")
              .required("Confirm Password is required"),
        })          
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }

    return (
        <GuestPage>
            <main className="bg-gray-100 flex items-center justify-center min-h-screen">
                {/* new register */}
                <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                    <h2 class="text-2xl font-semibold text-center text-primary mb-2">Register</h2>
                    <p class="text-center text-gray-500 mb-6">Let’s create your account</p>

                    <form onSubmit={formik.handleSubmit}>
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
                            <input
                                onChange={handleForm}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="example"
                                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {
                                formik.errors.name && <p>{formik.errors.name}</p>
                            }
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                onChange={handleForm}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@mail.com"
                                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {
                                formik.errors.email && <p>{formik.errors.email}</p>
                            }
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                onChange={handleForm}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {
                                formik.errors.password && <p>{formik.errors.password}</p>
                            }
                        </div>
                        <div class="mb-6">
                            <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirm Password</label>
                            <input
                                onChange={handleForm}
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="********"
                                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {
                                formik.errors.confirmPassword && <p>{formik.errors.confirmPassword}</p>
                            }
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary-dark transition"
                        >
                            Register
                        </button>
                    </form>

                    <p class="text-center text-gray-600 text-sm mt-6">
                    Already have an account? <Link to="/login" class="text-primary font-medium hover:underline hover:text-primary-dark">Log in</Link>
                    </p>
                </div>
            </main>
        </GuestPage>
    )
}

export default RegisterPage;