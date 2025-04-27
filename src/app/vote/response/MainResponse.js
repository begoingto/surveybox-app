'use client'
import React, {useEffect} from 'react';
import {Button, Card, Label, TextInput} from "flowbite-react";
import SBSCVoteFaQ from "@/components/surveycreator/SBSCVoteFaQ";
import {useDispatch, useSelector} from "react-redux";
import {fetchVote, selectResError, selectResponseVote, selectResStatus} from "@/store/feature/responsevote/response";
import {useFormik} from "formik";
import {selectSubVoteError, selectSubVoteStatus, submitVotes} from "@/store/feature/responsevote/voteSubmitResponse";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {useRouter} from "next/navigation";
import Image from "next/image";
import * as Yup from "yup";
import SbHandleThemeMode from "@/components/SBHandleThemeMode";


function MainResponse({params}) {
    const { uuid } = params;
    const dispatch = useDispatch();
    const currentVote = useSelector(selectResponseVote);
    const status = useSelector(selectResStatus);
    const error = useSelector(selectResError);
    const submitStatus = useSelector(selectSubVoteStatus);
    const router = useRouter();
    const submitError = useSelector(selectSubVoteError);

    useEffect(() => {
        dispatch(fetchVote({ uuid }));
    }, [dispatch, uuid]);

    let validation = Yup.object().shape({});

    if (currentVote?.voteOption === 'REQUIRED') {
        validation = Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Email is required'),
            username: Yup.string().required('Username is required'),
        });
    }

    const formik = useFormik({
        initialValues: {
            username: null,
            email: null,
            voteId: currentVote?.id,
            voteResultSetId: currentVote?.voteResultSets[0]?.id,
        },
        validationSchema: validation,
        onSubmit: async (values, { setSubmitting }) => {
            dispatch(submitVotes({ id: currentVote?.id, answers: values }));
        },
    });

    useEffect(() => {
        if (submitStatus === 'success') {
            router.push(`/vote/success`);
        }
    }, [router, submitStatus]);

    useEffect(() => {
        if (currentVote) {
            formik.setFieldValue('voteId', currentVote.id);
            formik.setFieldValue('answers', currentVote.voteResultSets);
        }
    }, [currentVote]);
    return (
        <SBHandleContent
            error={error}
            isLoading={['loading','idle'].includes(status)}
        >
            <section className={`max-w-3xl mx-auto p-2 rounded bg-gray-100 dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40 h-[100vh] overflow-auto space-y-5 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-rounded-full`}>
                <Card className={"!shadow-none !border-0 relative !m-0"}
                      renderImage={() => {
                          return (<Image
                              width={100}
                              unoptimized
                              className={"w-full h-32 object-cover object-center rounded-t-lg"}
                              height={100}
                              src={"/images/feedback/backgroundss.png"}
                              alt={"cover"}
                          />)
                      }}
                >
                    <div className={"text-center"}>
                        <h1 className="text-blue-800 dark:text-blue-50 text-2xl font-medium capitalize mb-2">
                            Welcome to vote of surveybox
                        </h1>
                        <p className="text-base leading-relaxed dark:text-gray-300">
                            Hi! Would you mind taking 2 minutes to complete this form? It would be great if you can submit your response. Thank you!
                        </p>
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <SbHandleThemeMode />
                    </div>
                </Card>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col space-y-5'>
                        {currentVote?.voteOption==='REQUIRED'?(
                            <div className='dark:bg-gray-800 bg-gray-100 w-full p-5 md:p-10 rounded-lg'>

                                <p className='mb-5 text-base'>The Vote is require you name and email, please input the blank field below.</p>

                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="username"
                                            value="Your Name"
                                        />
                                    </div>
                                    <TextInput
                                        helperText={ formik.errors.username && formik.touched.username ? <p className={"text-red-500"}>{formik.errors.username}</p> : null }
                                        id="username"
                                        // helperText={submitError?"Please input your name":null}
                                        color={submitError?"failure":"gray"}
                                        placeholder="Enter Username"
                                        type="text"
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="email"
                                            value="Your email"
                                        />
                                    </div>
                                    <TextInput
                                        id="email"
                                        helperText={ formik.errors.email && formik.touched.email ? <p className={"text-red-500"}>{formik.errors.email}</p> : null }
                                        color={submitError?"failure":"gray"}
                                        placeholder="Enter your email"
                                        type="email"
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                        ): null}
                    </div>

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-6 dark:bg-gray-800 bg-gray-100">
                        <div className="text-center my-4">
                            <p className="font-semibold text-2xl md:text-3xl lg:text-3xl font-heading text-blue-800 dark:text-blue-600 ">
                                {currentVote?.title}
                            </p>
                        </div>
                        <div  className="max-w-lg mx-auto" style={{ maxWidth: '24rem' }}>
                            <div className="grid grid-cols-12 gap-6">
                                {currentVote?.voteResultSets.map((voteResultSet, index) => (
                                    <SBSCVoteFaQ key={index} index={index} voteResultSet={voteResultSet} formik={formik}  />
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
                <Button
                    onClick={formik.handleSubmit}
                    color={"success"}
                    gradientDuoTone="purpleToBlue"
                    type={"button"}
                    className={"my-5 uppercase font-bold text-white tracking-widest w-full"}
                    disabled={formik.isSubmitting || 'loading'===submitStatus}
                    isProcessing={formik.isSubmitting || 'loading'===submitStatus}
                >
                    Submit
                </Button>
            </section>
        </SBHandleContent>
    );
}
export default MainResponse;