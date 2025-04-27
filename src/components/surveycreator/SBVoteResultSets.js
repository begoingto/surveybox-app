// SBVoteResultSets.js
'use client'
import React, { useState } from 'react';
import { Avatar, Spinner, TextInput } from 'flowbite-react';
import { VscChromeClose } from 'react-icons/vsc';
import { avatarDefault, SUPPORTED_FORMATS } from '@/lib/siteConfig';
import { useUploadFileMutation } from '@/store/feature/fileupload/fileapislice';
import { toast } from 'react-toastify';
import { getUserAvatar } from '@/lib/fileBase';

function SBVoteResultSets({ handleDelete, voteResult, index, formik }) {
    const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
    const [avatar, setAvatar] = useState(voteResult.image);
    const handleAvatar = async (e) => {
        const file = e.target.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type)) {
            const previewUrl = URL.createObjectURL(file);
            setAvatar(previewUrl);
            try {
                const { data: response } = await uploadFile(file);
                if (response.code === 200) {
                    const imageUrl = response.data.url;
                    setAvatar(imageUrl);
                    toast.success('Image uploaded successfully!');
                } else {
                    toast.error('Image upload failed. Please try again.');
                }
            } catch (error) {
                toast.error('Image upload failed. Please try again.');
            }
        }
    };

    const handleValueChange = (e) => {
        // You can handle value changes here
        const newValue = e.target.value;
        // Update the formik field value
        formik.setFieldValue(`voteResultSets.${index}.value`, newValue);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => handleDelete(index)}
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-700 hover:bg-gray-100 absolute top-0 left-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
                <span className="sr-only">Close menu</span>
                <VscChromeClose />
            </button>
            <label className="flex flex-col items-center justify-center rounded-lg h-48 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ">
                <div className="grid justify-center items-center bg-gray-50 rounded-full dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <label htmlFor={'dropzone-file' + index} className={'hover:cursor-pointer relative '}>
                        {isLoadingFile ? (
                            <div className={'flex items-center justify-center absolute top-0 left-0 w-full h-full bg-cyan-900 bg-opacity-40 z-40 rounded-lg'}>
                                <Spinner />
                            </div>
                        ) : (
                            ''
                        )}
                        <Avatar
                            bordered
                            img={getUserAvatar(avatar) ? getUserAvatar(avatar) : avatarDefault.src}
                            rounded
                            size="xl"
                            className={'object-cover'}
                        />
                        <input id={'dropzone-file' + index} type="file" className="hidden" onChange={handleAvatar} />
                    </label>
                </div>
            </label>
            <div>
                <TextInput
                    type="text"
                    className="w-full mt-8"
                    placeholder="Add your option"
                    autoComplete="off"
                    defaultValue={voteResult.value}
                    onChange={handleValueChange}
                />
            </div>
        </div>
    );
}

export default SBVoteResultSets;
