'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import {selectPersonalInfo, setPersonalInfo} from '@/store/feature/personalInfo/personalInfoSlice';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useSession} from "next-auth/react";

const SBStep2 = () => {
    const dispatch = useDispatch();
    const statePersonalInfo = useSelector(selectPersonalInfo);
    const {data: session, status} = useSession()
    const router = useRouter();
    const handleSubmit = (values, { setSubmitting }) => {
        const personalInfo = {
            email: session.user.email,
            ...statePersonalInfo.personalInfo,
            company: values.company,
            position: values.position,
        };
        dispatch(setPersonalInfo(personalInfo));
        router.push('/personal-info/step-3');
    };
    const validationSchema = Yup.object().shape({
        company: Yup.string().required('Company name is required'),
        position: Yup.string().required('Position is required'),
    });
    return (
        <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-700 md:text-2xl dark:text-white text-center">
                        Personal Info
                    </h1>

                    <Formik
                        initialValues={{ company: '', position: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">
                                        Company
                                    </label>
                                    <Field as={TextInput} id="company" name="company" placeholder="Enter company name" type="text" />
                                    <ErrorMessage name="company" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="position" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">
                                        Position
                                    </label>
                                    <Field as={TextInput} id="position" name="position" placeholder="Enter position" type="text" />
                                    <ErrorMessage name="position" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start text-center">
                                        <Link href={"/personal-info/step-3"} className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"> Skip</Link>
                                    </div>
                                    <div className="flex items-center justify-center gap-5">
                                        <Link href={"/personal-info/step-1"}>Back</Link>
                                        <Button pill type="submit" disabled={isSubmitting}>
                                            <span className="px-8">Next</span>
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default SBStep2;
