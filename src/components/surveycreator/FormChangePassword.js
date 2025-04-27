import { Button, Modal, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNewPasswordMutation } from '@/store/feature/auth/authApiSlice';
import { toast } from 'react-toastify';
import { sleep } from '@/lib/siteConfig';
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/store/feature/auth/AuthSlice";

function FormChangePassword() {
    const [openModal, setOpenModal] = useState(false);
    const [newPassword, { isLoading }] = useNewPasswordMutation();
    const auth = useSelector(selectCurrentUser)
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
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
        const { email, password, confirmPassword } = values;
        try {
            const { data } = await newPassword({ email, password, confirmPassword });
            toast.success('Password Change successfully.');
            await sleep(1000);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error('Failed to change password.');
            }
        }
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <a className="text-base text-cyan-700 hover:underline dark:text-cyan-500" onClick={() => setOpenModal(true)}>
                Change Password
            </a>
            <Modal show={openModal} size="md" popup onClose={closeModal}>
                <Modal.Header />
                <Modal.Body>
                    <Formik
                        initialValues={{
                            email: auth.email,
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                                await handleNewPassword(values);
                                setSubmitting(false);
                                resetForm();
                            } catch (error) {
                                if (error.response && error.response.status === 500) {
                                    toast.error('Server error. Please try again later.');
                                } else {
                                    toast.error('Failed to reset password.');
                                }
                            }
                        }}
                    >
                        {({ isSubmitting, handleSubmit }) => (
                            <Form className="space-y-4 md:space-y-5 " onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Change Your Password</h3>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-100">
                                            New Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="bg-blue-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Password"
                                        />
                                        <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600 dark:text-red-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-100">
                                            Confirm Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            className="bg-blue-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Confirm password"
                                        />
                                        <ErrorMessage name="confirmPassword" component="p" className="mt-2 text-sm text-red-600 dark:text-red-500" />
                                    </div>
                                    <div className="w-full">
                                        <Button disabled={isSubmitting || isLoading} type="submit" className="w-full">
                                              <span>
                                                <Spinner size="md" className={isLoading || isSubmitting ? 'block' : 'hidden'} />
                                                <span className="pl-3">
                                                  Submit <i className="bi bi-check-all"></i>
                                                </span>
                                              </span>
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FormChangePassword;
