'use client'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {useRegisterMutation} from "@/store/feature/auth/authApiSlice";
import React, {useState} from "react";
import * as Yup from "yup";
import {Button} from "flowbite-react";
import LoadingIndicator from "@/app/sign-in/components/LoadingIndicator";
import {toast} from "react-toastify";
import ToastConfig from "@/components/ToastConfig";
import {FaEye, FaEyeSlash} from "react-icons/fa";

function RegisterForm() {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    const router = useRouter();
    const [register,isError,isLoading] = useRegisterMutation();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const handleEmailChange = (e, setFieldValue) => {
        const lowercaseEmail = e.target.value.toLowerCase();
        setFieldValue('email', lowercaseEmail);
    };
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('The name is required.'),
        email: Yup.string().email('Invalid email address.').required('The email is required.'),
        password: Yup.string().required('The password is required.').matches(
            passwordRegex,
            "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
        ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match.')
            .required('Confirm password is required.').matches(
            passwordRegex,
            "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
        )
    });

    return (
        <>
            <ToastConfig />
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        values.authProvider="credentials"
                        const data = await register(values).unwrap();
                        // toast.success(data.message + " please check "+ data.data);
                        router.push('/sign-up-success');
                    } catch (error) {
                        const messages = error?.data.errors.map(el => el.name + ": "+ el.message)
                        toast.error(messages.join("\n"));
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting,setFieldValue }) => (
                    <Form className="space-y-4 md:space-y-5">
                        <div>
                            <label htmlFor="name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-100"
                            >
                                Name
                            </label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                className="bg-blue-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                           focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter name"
                            />
                            <ErrorMessage name="name" component="p" className="mt-2 text-sm text-red-600 dark:text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-100">
                                Email
                            </label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className="bg-blue-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                           focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                onChange={(e) => handleEmailChange(e, setFieldValue)}
                            />
                            <ErrorMessage name="email" component="p" className="mt-2 text-sm text-red-600 dark:text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-100">
                                Password
                            </label>
                            <div className="relative">
                                <Field
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="form-control focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter password"
                                />
                                {/* Toggle eye icon based on passwordVisible state */}
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

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-100">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Field
                                        type={passwordVisible ? "text" : "password"} // Use the same state for visibility
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className="form-control focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter password"
                                    />
                                    {/* Toggle eye icon based on passwordVisible state */}
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
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {loadingSubmit ? <LoadingIndicator width={5} height={5} /> : null}
                            Create Account
                        </Button>
                        <div className={"flex gap-2 justify-center"}>
                            <div>Already Have an Account?</div>{' '}
                            <a className="text-base text-cyan-700 hover:underline dark:text-cyan-500" onClick={() => router.push('/sign-in')}>Login</a>
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default RegisterForm;
