'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Avatar, Button, Spinner} from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import {useUpdatePersonalInfoMutation} from '@/store/feature/auth/authApiSlice';
import { selectPersonalInfo } from '@/store/feature/personalInfo/personalInfoSlice';
import {avatarDefault, sleep, SUPPORTED_FORMATS} from '@/lib/siteConfig';
import {useUploadFileMutation} from "@/store/feature/fileupload/fileapislice";
import {fileImgUrl, getUserAvatar} from "@/lib/fileBase";
import {toast} from "react-toastify";
import {selectCurrentUser, setCurrentUser} from "@/store/feature/auth/AuthSlice";
import {useSession} from "next-auth/react";
import ToastConfig from "@/components/ToastConfig";

function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [updatePersonalInfo, { isLoading }] = useUpdatePersonalInfoMutation();
    const [uploadFile,{isLoading: isLoadingFile }] = useUploadFileMutation();
    const {data: session, status} = useSession()
    const auth = useSelector(selectCurrentUser)
    const [avatar, setAvatar] = useState(null)
    const personalInfo = useSelector(selectPersonalInfo);
    const handleAvatar = async (e) => {
        const file = e.target.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type)) {
            const previewUrl = URL.createObjectURL(file);
            setAvatar(previewUrl);
            dispatch(setCurrentUser({ ...auth, avatar: getUserAvatar(previewUrl) }));
            try {
                const { data: response } = await uploadFile(file);
                if (response.code === 200) {
                    const imageUrl = response.data.url;
                    setAvatar(imageUrl);
                    toast.success('Image uploaded successfully!');
                }
            } catch (error) {
                toast.error('Image upload failed. Please try again.');
            }
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedPersonalInfo = {
            ...personalInfo.personalInfo,
            email: session.user.email,
            avatar,
        };
        try {
            const response = await updatePersonalInfo(updatedPersonalInfo).unwrap();
            await sleep(500)
            router.push('/surveycreator/dashboard');
        } catch (error) {
        }
    };
    return (
        <section className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen sm:items-center lg:py-0">
            <form method="POST" onSubmit={handleSubmit}>
                <ToastConfig/>
                <div className="flex flex-col lg:items-end items-center justify-center px-8 mx-auto lg:py-0">
                    <div className="w-full md:mt-0 sm:max-w-md xl:p-0 d">
                        <div className="space-y-4 md:space-y-6 max-sm:p-8 sm:p-8 ">
                            <h1 className="text-xl font-bold capitalize leading-tight tracking-tight text-blue-700 text-center dark:text-white">
                                Upload your profile picture
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="grid justify-center items-center " >
                    <label htmlFor="dropzone-file" className={"hover:cursor-pointer relative"}
                    >
                        {isLoadingFile ? (<div className={"flex items-center justify-center absolute top-0 left-0 w-full h-full bg-cyan-900 bg-opacity-40 z-40 rounded-lg"}>
                            <Spinner />
                        </div>) : ''}
                        <Avatar
                            bordered
                            img={getUserAvatar(auth?.avatar) ? getUserAvatar(auth?.avatar) : avatarDefault.src}
                            rounded
                            size="xl"
                            className={"object-cover"}
                        />
                        <input id="dropzone-file" type="file"  className="hidden" onChange={handleAvatar}/>
                    </label>
                </div>

                <br />
                <br />
                <div className="flex justify-between">
                    <button type="submit" disabled={isLoading}   className="self-center block text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                        Skip
                    </button>
                    <Button pill type="submit" disabled={isLoading}>
                        <span className="px-8">Save</span>
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default Page;
