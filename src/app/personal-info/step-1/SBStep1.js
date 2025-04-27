'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {Button, TextInput} from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import {selectPersonalInfo, setPersonalInfo} from '@/store/feature/personalInfo/personalInfoSlice';
import SbDatepicker from "@/components/SBDatepicker";
import moment from 'moment';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useSession} from "next-auth/react";
import ToastConfig from "@/components/ToastConfig";

const SBStep1 = () => {
    const dispatch = useDispatch();
    const statePersonalInfo = useSelector(selectPersonalInfo);
    const {data: session, status} = useSession()
    const router = useRouter();
    const [show, setShow] = useState(false);
    const handleSubmit = (values, { setSubmitting }) => {
        const dobValue = values.dob ? moment(values.dob).format('YYYY-MM-DD') : '2000-01-01';
        const personalInfo = {
            ...statePersonalInfo.personalInfo,
            email: session.user.email,
            phone: values.phone,
            address: values.address,
            dob: dobValue,
        };
        dispatch(setPersonalInfo(personalInfo));
        router.push('/personal-info/step-2');
    };
    const validationSchema = Yup.object().shape({
        phone: Yup.string().required('Phone number is required'),
        dob: Yup.string().required('Date of birth is required'),
        address: Yup.string().required('Address is required'),
    });

    return (
        <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-700 md:text-2xl dark:text-white text-center">
                        Personal Info
                    </h1>
                    <ToastConfig/>
                    <Formik
                        initialValues={{
                            phone: '',
                            dob: '2000-01-01',
                            address: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="phonenumber" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">
                                        Phone number
                                    </label>
                                    <Field as={TextInput} id="phone" name="phone" placeholder="Enter phone number" type="text" />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className={'relative'}>
                                    <label htmlFor="dateofbirth" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">
                                        Date of birth
                                    </label>
                                    <Field name="dob" validate={(value) => (value ? undefined : 'Date of birth is required')}>
                                        {({ field, meta }) => (
                                            <SbDatepicker
                                                value={field.value ? field.value : '2000-01-01'}
                                                onChange={(selectedDate) => field.onChange(moment(selectedDate).format('YYYY-MM-DD'))}
                                                show={show}
                                                setShow={setShow}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="dob" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">
                                        Address
                                    </label>
                                    <Field as={TextInput} id="address" name="address" placeholder="Enter address" type="text" />
                                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start text-center">
                                        <Link href={"/personal-info/step-2"} className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">Skip</Link>
                                    </div>
                                    <div className="flex items-center justify-center gap-5">
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

export default SBStep1;