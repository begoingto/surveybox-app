import CheckConnection from "@/app/sign-in/components/checkConnection";
import FormForgotPassword from "@/components/FormForgotPassword";
import ToastConfig from "@/components/ToastConfig";
import { Alert, Button } from 'flowbite-react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';


function LoginForm() {
    const { status } = useSession()
    const router = useRouter();
    const [resErr, setResErr] = useState(null);
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .required('Password is required')
            .matches(
                passwordRegex,
                'Password must be at least 6 characters, a number, an Uppercase, and a Lowercase'
            ),
    });

    const sbHandleSubmit = async ({ email, password }) => {
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
        console.log(res)
        const resp = JSON.parse(res.error)
        if (resp.code === 401) {
            setResErr([{ message: "Invalid email or password. Please check your credentials and try again." }])
        } else {
            setResErr(resp.errors)
        }
    };

    return (
        <>
            <CheckConnection />
            <ToastConfig />
            {resErr ? (
                <Alert
                    color="failure"
                >
                    {typeof resErr === 'string' ? resErr + "your account isn't active." : (
                        <ul>
                            {resErr.map((err, index) => (
                                <li key={index}>{err.message}</li>
                            ))}
                        </ul>
                    )}
                </Alert>
            ) : null}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    await sbHandleSubmit(values)
                }}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <Form className="space-y-4 md:space-y-5 " onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field
                                type="email" name="email" id="email"
                                className={"form-control focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                placeholder="Enter email"
                            />
                            <ErrorMessage
                                name="email"
                                component="p"
                                className="mt-2 text-sm text-red-600 dark:text-red-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="relative">
                                <Field
                                    type={passwordVisible ? "text" : "password"} // Set the type based on passwordVisible state
                                    name="password"
                                    id="password"
                                    className={"form-control focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                    placeholder="Enter password"
                                />
                                {/* Toggle eye icon based on passwordVisible state */}
                                {passwordVisible ? (
                                    <FaEye
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                                        onClick={() => setPasswordVisible(false)}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                                        onClick={() => setPasswordVisible(true)}
                                    />
                                )}
                            </div>
                            <ErrorMessage
                                name="password"
                                component="p"
                                className="mt-2 text-sm text-red-600 dark:text-red-500"
                            />
                        </div>
                        <Button disabled={isSubmitting} type="submit" className="w-full" isProcessing={isSubmitting}>
                            Login
                        </Button>
                        <div className={" gap-2 justify-center"}>
                            <div className={"flex justify-center gap-2"}>Don&apos;t Have An Account?
                                <a className="text-base text-cyan-700 hover:underline dark:text-cyan-500" onClick={() => router.push('/sign-up')}>Sign Up</a>
                            </div>
                            <div className={"flex gap-2 justify-center"}>
                                <FormForgotPassword />
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default LoginForm;
