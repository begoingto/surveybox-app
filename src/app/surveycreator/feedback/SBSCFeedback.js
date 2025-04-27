'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Textarea } from "flowbite-react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useFeedbackMutation } from "@/store/feature/feedback/FeedbackSlice";
import ToastConfig from "@/components/ToastConfig";
import { toast } from "react-toastify";
import * as Yup from 'yup';
const Page = () => {

    const [feedback, { isError }] = useFeedbackMutation();

    const handleStarClick = (starIndex, values, setFieldValue) => {
        const currentRating = values.rating;
        // Toggle the rating value for the clicked star
        if (currentRating === starIndex + 1) {
            setFieldValue('rating', 0); // Set rating to 0 if already selected
        } else {
            setFieldValue('rating', starIndex + 1); // Set rating to starIndex + 1
        }
    };

    // Function to handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);

        try {
            // Perform form submission
            await validationSchema.validate(values);
            const { data: res } = await feedback(values);
            toast.success("You have successfully created feedback");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // Handle Yup validation errors
                toast.error(error.message);
            } else {
                // Handle other errors
                alert('Submission failed. Please try again.');
            }
        }

        setSubmitting(false);
    };
    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        rating: Yup.number()
            .moreThan(0, "Please select a star rating before submitting.")
            .required("Please select a star rating before submitting."),
        description: Yup.string()
            .min(10, "Please enter a description with at least 10 characters.")
            .required("Please enter a description with at least 10 characters."),
    });
    return (
        <>
            <ToastConfig />
            <section className="mx-auto max-w-screen-sm my-10">
                <h2 className="font-light text-center my-10 sm:text-3xl dark:text-gray-400">
                    How likely are you to recommend our service to a friend or colleague?
                </h2>
                <Formik
                    initialValues={{
                        rating: 0,
                        description: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            <div className="flex justify-center lg:gap-10 gap-6 py-5">
                                {[...Array(5)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer"
                                        onClick={() => handleStarClick(index, values, setFieldValue)}
                                    >
                                        {index < values.rating ? (
                                            <BsStarFill className="lg:w-10 lg:h-10 w-8 h-8 text-yellow-400" />
                                        ) : (
                                            <BsStar className="lg:w-10 lg:h-10 w-8 h-8 text-yellow-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <ErrorMessage
                                name="rating"
                                component="p"
                                className="text-red-500 mt-2"
                            />
                            <br />
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="description"
                                    className={"text-xl"}
                                    value="What feature can we improve?"
                                />
                            </div>
                            <Field
                                as={Textarea}
                                id="description"
                                name="description"
                                placeholder="What Do You Think About Our Platform?"
                                rows={4}
                            />
                            <ErrorMessage
                                name="description"
                                component="p"
                                className="text-red-500 mt-2"
                            />
                            <br />
                            <Button pill type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="px-3 lg:px-10">Loading...</span>
                                ) : (
                                    <span className="px-3 lg:px-10">Submit</span>
                                )}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </section>
        </>
    );
};

export default Page;

