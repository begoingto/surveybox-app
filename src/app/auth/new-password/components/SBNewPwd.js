'use client'
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {  Button, Spinner } from 'flowbite-react';
import { useNewPasswordMutation } from '@/store/feature/auth/authApiSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {useRouter, useSearchParams} from "next/navigation";
import {sleep} from "@/lib/siteConfig";
import {FaEye, FaEyeSlash} from "react-icons/fa";

function NewPassword() {
    const [ setResErr] = useState(null);
    const queryStr = useSearchParams()
    const router = useRouter();
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    const [newPassword, { isLoading }] = useNewPasswordMutation();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .matches(
                passwordRegex,
                'Password must be at least 6 characters, a number, an Uppercase, and a Lowercase'
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match.')
            .required('Confirm password is required.')
            .matches(
                passwordRegex,
                'Password must be at least 6 characters, a number, an Uppercase, and a Lowercase'
            ),
    });

    const handleNewPassword = async (values) => {
        values.email = queryStr.get('email')
        const { email, password ,confirmPassword} = values;
        try {
            const { data } = await newPassword({ email, password ,confirmPassword});
            // Handle successful password reset
            toast.success('Password reset successful.'); // Display success toast
            await sleep(1000)
            router.push('/sign-in')
        } catch (error) {
            // Handle password reset error
            if (error.status === 500) {
                toast.error('Server error. Please try again later.'); // Display server error toast
            } else {
                toast.error('Failed to reset password.'); // Display generic error toast
            }
            setResErr(error);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    email:'',
                    password: '',
                    confirmPassword:'',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        await handleNewPassword(values);
                        setSubmitting(false);
                        resetForm();
                    } catch (error) {
                        if (error.status === 500) {
                            toast.error('Server error. Please try again later.');
                        } else {
                            toast.error('Failed to reset password.');
                        }
                        setResErr(error);
                    }
                }}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <Form className="space-y-4 md:space-y-5 " onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-100">
                                Password
                            </label>
                            <div className="relative">
                            <Field
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                id="password"
                                className="bg-blue-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                           focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                           dark:focus:border-blue-500"
                                placeholder="Password"
                            />
                            {passwordVisible ? (
                                <FaEye
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <FaEyeSlash
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                            </div>
                            <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600 dark:text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-100">
                                Confirm Password
                            </label>
                            <div className="relative">
                            <Field
                                type={passwordVisible ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                className="bg-blue-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                           focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Confirm password"
                            />
                            {passwordVisible ? (
                                <FaEye
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <FaEyeSlash
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>
                            <ErrorMessage name="confirmPassword" component="p" className="mt-2 text-sm text-red-600 dark:text-red-500" />
                        </div>
                        <Button disabled={isSubmitting}
                                type="submit"
                                className="w-full"
                                >
                            <span>
                                <Spinner size={'md'} className={isLoading || isSubmitting ? 'block' : 'hidden'} />
                                <span className={'pl-3'}>
                                    Submit  <i className="bi bi-check-all"></i>
                                </span>
                            </span>
                        </Button>
                    </Form>
                )}
            </Formik>
            <ToastContainer />
        </>
    );
}

export default NewPassword;
