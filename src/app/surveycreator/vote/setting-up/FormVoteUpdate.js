'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {useFormik} from "formik";
import {Button, Card, Label, Radio, Spinner, TextInput, ToggleSwitch,} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {BiSave} from "react-icons/bi";
import * as Yup from "yup";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {SUPPORTED_FORMATS, thumbnailDefault} from "@/lib/siteConfig";
import Image from "next/image";
import {MdClose} from "react-icons/md";
import {useUploadFileMutation} from "@/store/feature/fileupload/fileapislice";
import {getUserAvatar} from "@/lib/fileBase";
import {useGetSingleVoteQuery, usePostVoteMutation, useUpdateVoteMutation} from "@/store/feature/vote/voteApiSlice";
import ToastConfig from "@/components/ToastConfig";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {addVote, selectVote} from "@/store/feature/vote/voteSlice";
import {toast} from "react-toastify";


const validationSchema = Yup.object({
    title: Yup.string().min(2,"The title must be lease than 2.").required('The title field is required.'),
});

function FormVoteUpdate({params}) {
    const {id} = params
    const [isChecked, setIsChecked] = useState(true);
    const dispatch = useDispatch();
    const voteState = useSelector(selectVote)
    const [updateVote, isLoading] = useUpdateVoteMutation();
    const { data: res,isLoading:getLoading,error,isFetching} = useGetSingleVoteQuery(id,{ refetchOnMountOrArgChange: true })
    useEffect(() => {
        formik.setValues((prevValues) => ({
            ...prevValues,
            status: isChecked,
        }));
    }, [isChecked]);
    const formik = useFormik({
        initialValues: {
            id: null,
            title: '',
            choosing: 'SINGLE',
            status: isChecked,
            voteOption: 'ANONYMOUS',
            voteResultSets: [],
        },
        validationSchema,
        onSubmit:async ( values,{setSubmitting}) => {
            const { data: res } = await updateVote({id: values.id, data: values});
            if (res?.data) {
                setSubmitting(false)
                toast.success('You have successfully update a vote on the main page.');
            }
            if (res?.error){
            }
        },
    });

    useEffect(() => {
        if (res?.data){
            dispatch(addVote(res.data))
            formik.setValues(res.data)
        }
    }, [dispatch, res]);


    return (
        <SBHandleContent
            isLoading={getLoading || isFetching}
            error={error}
        >
            <ToastConfig />
            <Card className={"max-w-3xl mx-auto border-0"}>
                <form onSubmit={formik.handleSubmit} className={"grid grid-cols-1 space-y-5"}>
                    {/* Vote title */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="title"
                                value="Vote title"
                            />
                        </div>
                        <TextInput
                            // color={formik.errors.title && formik.touched.title ? "failure" :"success"}
                            helperText={ formik.errors.title && formik.touched.title ? <p className={"text-red-500"}>{formik.errors.title}</p> : null }
                            id="title"
                            placeholder="Enter vote title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            type="text"
                        />
                    </div>
                    {/* End Vote title */}

                    {/* Vote choosing and Option */}
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="mb-3 block">
                                <p>Answer Choose</p>
                                <div className="flex gap-5">
                                    <div className="flex items-center gap-2 my-2">
                                        <Radio
                                            defaultChecked
                                            id={`single`}
                                            name="choosing"
                                            value="SINGLE"
                                            onChange={formik.handleChange}
                                        />
                                        <Label htmlFor="single">Single</Label>
                                    </div>
                                    <div className="flex items-center gap-2 my-2">
                                        <Radio
                                            id={`multiple`}
                                            name="choosing"
                                            value="MULTIPLE_CHOICE"
                                            onChange={formik.handleChange}
                                        />
                                        <Label htmlFor="multiple">Multiple</Label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 block">
                                <p>Vote Option</p>
                                <div className="flex gap-5">
                                    <div className="flex items-center gap-2 my-2">
                                        <Radio
                                            defaultChecked
                                            id={`anonymous`}
                                            name="voteOption"
                                            value="ANONYMOUS"
                                            onChange={formik.handleChange}
                                        />
                                        <Label htmlFor="anonymous">Anonymous</Label>
                                    </div>
                                    <div className="flex items-center gap-2 my-2">
                                        <Radio
                                            id={`required`}
                                            name="voteOption"
                                            value="REQUIRED"
                                            onChange={formik.handleChange}
                                        />
                                        <Label htmlFor="required">Required</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Vote choosing and Option */}


                    <div
                        className="flex max-w-md flex-col gap-4"
                        id="toggle"
                    >
                        <ToggleSwitch
                            checked={isChecked}
                            label={isChecked ? 'Active' : 'Inactive'}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                    </div>
                    <Label htmlFor="title"><p>Answer Option</p></Label>
                    {/* Vote ResultSets */}
                    <div className={"border-2 border-gray-200 border-dashed rounded-lg p-2 lg:p-3 dark:border-gray-700"}>
                        <VoteResultSets formik={formik}/>
                    </div>
                    {/* End Vote ResultSets */}

                    <div className={"flex space-x-2"}>
                        <button
                            type={"button"}
                            onClick={formik.handleReset}
                            className={"text-red-500 opacity-70 hover:opacity-100"}>
                            Reset
                        </button>
                        <Button pill
                                disabled={formik.isSubmitting && isLoading}
                                type={"submit"}
                                className={"uppercase w-fit"}
                                isProcessing={formik.isSubmitting && isLoading}
                        >
                            <BiSave className={"mr-2 h-5 w-5"} />
                            <span>Update</span>
                        </Button>
                    </div>
                </form>
            </Card>
        </SBHandleContent>
    );
}

export default FormVoteUpdate;


const VoteResultSets = ({formik}) => {
    const handleAddVoteResultSet = () => {
        formik.setFieldValue("voteResultSets", [
            ...formik.values.voteResultSets,
            {
                image: '',
                value: '',
            },
        ]);
    }
    return (
        <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5"}>
            <button
                type="button"
                onClick={handleAddVoteResultSet}
                className={"flex flex-col items-center justify-center w-full h-20 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 "+ (formik.values.voteResultSets.length === 0 ? "h-48" : "sm:h-full")}
            >
                <div className="flex items-center justify-center gap-2">
                    <BsFillPlusCircleFill /><b>Add New</b>
                </div>
            </button>
            {formik.values.voteResultSets.map((voteResultSet, index) => (
                <VoteResultSetItem voteResultSet={voteResultSet} formik={formik} key={index} index={index} />
            ))}
        </div>
    )
}

const VoteResultSetItem = ({voteResultSet,formik,index}) => {
    const [previewImg, setPreviewImg] = useState(voteResultSet.image!==''? getUserAvatar(voteResultSet.image) : thumbnailDefault.src);
    const [uploadFile,{isLoading }] = useUploadFileMutation();
    const [newVoteResultSets, setNewVoteResultSets] = useState([...formik.values.voteResultSets]);
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type)){
            const previewUrl = URL.createObjectURL(file);
            setPreviewImg(previewUrl);
            handleUpload(file).then(res => res).catch(e => console.log(e));
        }
    }

    const handleUpload = useCallback(async (file) => {
        try {
            const { data: response } = await uploadFile(file);
            if (response.code === 200) {
                const imageUrl = response.data.url;
                const resultSet  = {...formik.values.voteResultSets[index], image: response.data.url}
                formik.setFieldValue(`voteResultSets[${index}]`,resultSet)
                // console.log('Image uploaded:', imageUrl);
            } else {
                // console.error('Invalid response:', response);
            }
        } catch (error) {
            // console.error('Image upload failed:', error);
        }
    }, [index, newVoteResultSets, uploadFile]);

    const handleRemoveItem = () => {
        const newV = [...formik.values.voteResultSets];
        newV.splice(index, 1);
        formik.setFieldValue("voteResultSets", newV);
    }

    const handleOptionValueChange = (e) => {
        const resultSet  = {...formik.values.voteResultSets[index], value: e.target.value}
        formik.setFieldValue(`voteResultSets[${index}]`,resultSet)
    }
    return (
        <div className={"flex flex-col space-y-2 relative"}>
            <button
                type={"button"}
                onClick={handleRemoveItem}
                className={"absolute top-0 right-0 p-1 rounded-full z-10 bg-gray-600 dark:hover:bg-gray-600"}
            >
                <MdClose className={"w-5 h-5 text-red-500"} />
            </button>
            <div className={"absolute top-0 left-0 h-full w-full flex items-center justify-center z-20 bg-gray-200 dark:bg-gray-900 rounded bg-opacity-30 dark:bg-opacity-30 " + (isLoading ? "" : "hidden")}>
                <Spinner aria-label="Default status example" />
            </div>
            <label htmlFor={"optImg_"+ index} className={"hover:cursor-pointer border border-gray-200 border-dashed rounded-lg p-1 dark:border-gray-700"}>
                <Image
                    unoptimized
                    width={100}
                    height={100}
                    src={previewImg}
                    className={"object-contain h-48 lg:h-32 w-full rounded hover:opacity-75"}
                    alt={"thumbnail"}
                />
            </label>
            <input type="file" id={"optImg_"+index} className={"hidden"} name={"image"} onChange={handleImage}/>
            <TextInput
                placeholder="Option value"
                defaultValue={voteResultSet.value}
                onBlur={handleOptionValueChange}
            />
        </div>
    )
}

