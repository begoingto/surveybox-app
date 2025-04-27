// VoteTypes.js
'use client'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVoteResultSet, removeVoteResultSet, selectVoteResultSets } from '@/store/feature/vote/voteSlice';
import { SUPPORTED_FORMATS } from '@/lib/siteConfig';
import { useUploadFileMutation } from '@/store/feature/fileupload/fileapislice';
import SBVoteResultSets from '@/components/surveycreator/SBVoteResultSets';
import { GrFormAdd } from 'react-icons/gr';
import { useFormik } from 'formik';

function VoteTypes() {
    const dispatch = useDispatch();
    const voteResultSetsState = useSelector(selectVoteResultSets);
    const [previewImg, setPreviewImg] = React.useState('');
    const [uploadFile] = useUploadFileMutation();

    const initialValues = {
        image: '',
        value: '',
    };

    const formikVoteTypes = useFormik({
        initialValues,
        onSubmit: (values, { resetForm }) => {
            dispatch(
                addVoteResultSet({
                    image: values.image,
                    value: values.value,
                })
            );
            resetForm();
        },
        validate: (values) => {
            const errors = {};
            // You can add custom validation rules here if needed
            return errors;
        },
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type)) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImg(previewUrl);
            formikVoteTypes.setFieldValue('image', file);
            await handleUpload(file);
        }
    };

    const handleUpload = async (file) => {
        try {
            const { data: response } = await uploadFile(file);
            if (response.code === 200) {
                const imageUrl = response.data.url;
                setPreviewImg(imageUrl);
                formikVoteTypes.setFieldValue('image', imageUrl);
            } else {
                // console.error('Invalid response:', response);
            }
        } catch (error) {
            // console.error('Image upload failed:', error);
        }
    };

    const handleAddResultSet = () => {
        formikVoteTypes.handleSubmit();
    };

    const handleDelete = (index) => {
        dispatch(removeVoteResultSet(index));
    };

    return (
        <>
            {/* image upload */}
            <div className="px-20">
                <div className="my-6 text-lg">Answer Option</div>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10">
                    <form onSubmit={formikVoteTypes.handleSubmit} encType="multipart/form-data">
                        <div className="relative">
                            <div
                                onClick={handleAddResultSet}
                                type="button"
                                className="flex flex-col items-center justify-center h-48  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex items-center justify-center gap-2 ">
                                    <GrFormAdd />
                                    <span>Add New</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                name="image"
                                id="img"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </form>
                    {voteResultSetsState.map((voteResult, i) => (
                        <SBVoteResultSets
                            key={i}
                            index={i}
                            handleDelete={handleDelete}
                            voteResult={voteResult}
                            formik={formikVoteTypes}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default VoteTypes;
