'use client'
import React, {useEffect, useRef, useState} from 'react';
import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter, FaUserEdit } from 'react-icons/fa';
import {Avatar, Button, Label, Modal, Spinner} from 'flowbite-react';
import { Formik, Field, Form } from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import { useGetUserQuery } from '@/store/feature/user/UserSlice';
import { useUpdateMutation } from '@/store/feature/auth/authApiSlice';
import { toast } from 'react-toastify';
import ToastConfig from '@/components/ToastConfig';
import {CustomInputText, CustomInputTextSocialMedia} from '@/components/Utils';
import {useUploadFileMutation} from "@/store/feature/fileupload/fileapislice";
import {avatarDefault, SUPPORTED_FORMATS} from "@/lib/siteConfig";
import {selectCurrentUser, setCurrentUser} from "@/store/feature/auth/AuthSlice";
import {getUserAvatar} from "@/lib/fileBase";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import SBSCPersonalLoading from "@/components/loading/surveycreatorloading/SBSCPersonalLoading";
import {AiOutlineCamera} from "react-icons/ai";
import FormChangePassword from "@/components/surveycreator/FormChangePassword";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is Required'),
    gender: Yup.string().required('Gender is Required'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
});
function SBSCPersonal() {
    const dispatch = useDispatch();
    const auth = useSelector(selectCurrentUser)
    const [edit, setEdit] = useState(false);
    const fileRef = useRef()
    const [openModal, setOpenModal] = useState();
    const [previewImg, setPreviewImg] = useState(getUserAvatar(auth?.avatar) ? getUserAvatar(auth?.avatar) : avatarDefault.src);
    const initUserProfile = {
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        company: '',
        avatar: '',
        phone: '',
        address: '',
        position: '',
        socialMedias: {
            twitter: '',
            facebook: '',
            google: '',
            linkedin: '',
        },
    };
    const { data: res, isLoading } = useGetUserQuery();
    const [updateUser, { isLoading: isUpdating,error }] = useUpdateMutation();
    const [uploadFile,{isLoading: isLoadingFile }] = useUploadFileMutation();
    const handleAvatar = async (e) => {
        setOpenModal('no');
        const file = e.target.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type)) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImg(previewUrl);
            dispatch(setCurrentUser({ ...auth, avatar: getUserAvatar(previewUrl) }));

            try {
                const { data: response } = await uploadFile(file);
                if (response.code === 200) {
                    const imageUrl = response.data.url;
                    dispatch(setCurrentUser({ ...auth, avatar: getUserAvatar(imageUrl) }));
                    const updatePf = await updateUser({ ...auth, avatar: imageUrl });
                    toast.success('Image uploaded successfully!');
                }
            } catch (error) {
                const res = await uploadFile(file);
                if (res.error.data.code === 400) {
                    setPreviewImg(getUserAvatar(auth.avatar) ? getUserAvatar(auth.avatar) : avatarDefault.src);
                    dispatch(setCurrentUser({ ...auth, avatar: auth.avatar }));
                    toast.error('Once the image is smaller than 1MB, please try to upload it again.');
                } else {
                    toast.error('An error occurred while uploading the image. Please try again later.');
                }
            }
        }
    };

    useEffect(() => {
        if (openModal === "yes" ){
            fileRef.current.click()
        }
        if (openModal === 'no'){
            setOpenModal(undefined)
        }
    },[openModal])
    if (isLoading) {
        return <SBSCPersonalLoading />;
    }
    if (res) {
        const user = res.data;
        initUserProfile.firstName = user.firstName;
        initUserProfile.lastName = user.lastName;
        initUserProfile.gender = user.gender;
        initUserProfile.email = user.email;
        initUserProfile.company = user.company;
        initUserProfile.avatar = user.avatar;
        initUserProfile.phone = user.phone;
        initUserProfile.address = user.address;
        initUserProfile.position = user.position;
        if (user.socialMedias !== null) {
            initUserProfile.socialMedias = {
                ...initUserProfile.socialMedias,
                twitter: user.socialMedias.twitter || initUserProfile.socialMedias.twitter,
                facebook: user.socialMedias.facebook || initUserProfile.socialMedias.facebook,
                linkedin: user.socialMedias.linkedin || initUserProfile.socialMedias.linkedin,
                google: user.socialMedias.google || initUserProfile.socialMedias.google,
            };
        }
    }
    return (
        <SBHandleContent
            isLoading={isLoading}
            isError={error}
        >
            <ToastConfig/>
            <Formik
                initialValues={initUserProfile}
                validationSchema={validationSchema}
                onSubmit={ async (values,{setSubmitting}) => {
                    try {
                        const {data: res} = await updateUser(values)
                        dispatch(setCurrentUser(res.data))
                        setEdit(false);
                        toast.success("Success Updated!")
                    } catch (error) {
                    }
                }}
            >
                {({
                      values, handleSubmit
                  }) => (
                    <Form onSubmit={handleSubmit} >
                        <div className='sm:grid grid-cols-12 gap-10 py-12 px-6'>
                            <div className='col-span-12 md:col-span-4 place-content-center'>
                                <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-md">
                                    <div className={"flex justify-end"}>
                                        <FaUserEdit
                                            className=' h-6 w-6 text-blue-800 dark:text-blue-600 text-left '/>
                                    </div>
                                    <div className="grid justify-center items-center " >
                                        <div onClick={() => setOpenModal('pop-up')}
                                             htmlFor="dropzone-file"
                                             className={"hover:cursor-pointer relative"}
                                        >
                                            {isLoadingFile ? (<div className={"flex items-center justify-center absolute top-0 left-0 w-full h-full bg-cyan-900 bg-opacity-40 z-40 rounded-lg"}>
                                                <Spinner />
                                            </div>) : ''}
                                            <Avatar
                                                bordered
                                                img={previewImg}
                                                rounded
                                                size="xl"
                                                className={"object-cover"}
                                            />
                                            <input id="dropzone-file" type="file" onBlur={() => setOpenModal('no')} ref={fileRef} className="hidden" onChange={handleAvatar}/>
                                        </div>
                                        <p
                                            className='font-medium text-base text-gray-400 dark:text-gray-400 my-2 text-center'
                                        >{values.firstName} {values.lastName}</p>
                                    </div>
                                </div>
                                <br/>
                                {/* social media */}
                                <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-md">
                                    <h1 className='text-xl font-medium text-blue-800 dark:text-blue-600'>Social
                                        media</h1>
                                    <div className="flex items-center mt-5">
                                        <FaTwitter className="h-5 w-5 mr-3 text-blue-800 dark:text-blue-600" />
                                        <Field
                                            id="twitter"
                                            name="socialMedias.twitter"
                                            placeholder="Twitter"
                                            value={values.socialMedias?.twitter || ''}
                                            edit={edit}
                                            component={CustomInputTextSocialMedia}
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex items-center mt-5">
                                        <FaFacebook className="h-5 w-5 mr-3 text-blue-800 dark:text-blue-600" />
                                        <Field
                                            id="facebook"
                                            name="socialMedias.facebook"
                                            value={values.socialMedias?.facebook || ''}
                                            edit={edit}
                                            component={CustomInputTextSocialMedia}
                                            placeholder="Facebook"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex items-center mt-5">
                                        <FaLinkedin className="h-5 w-5 mr-3 text-blue-800 dark:text-blue-600" />
                                        <Field
                                            id="linkedin"
                                            name="socialMedias.linkedin"
                                            value={values.socialMedias?.linkedin || ''}
                                            edit={edit}
                                            component={CustomInputTextSocialMedia}
                                            placeholder="LinkedIn"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex items-center mt-5">
                                        <FaGoogle className="h-5 w-5 mr-3 text-blue-800 dark:text-blue-600" />
                                        <Field
                                            id="google"
                                            name="socialMedias.google"
                                            value={values.socialMedias?.google || ''}
                                            edit={edit}
                                            component={CustomInputTextSocialMedia}
                                            placeholder="Google"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-12 md:col-span-8'>
                                <div className={'bg-slate-50 dark:bg-gray-800 p-8 rounded-md h-full'}>
                                    <h1 className='text-xl font-medium text-blue-800 dark:text-blue-600'>General
                                        Information</h1>
                                    <div className='grid grid-cols-12 gap-2'>
                                        <div className={"col-span-12 md:col-span-6"}>
                                            {/* First name*/}
                                            <div className="mb-2 block mt-6">
                                                <Label htmlFor="firstName" value="FirstName" className={"uppercase text-gray-500 font-bold"}/>
                                            </div>
                                            <Field
                                                name="firstName"
                                                value={values.firstName}
                                                id='firstName'
                                                component={CustomInputText}
                                                type="text"
                                                edit={edit}
                                                style={{ fontSize: '16px' }}
                                            />
                                            {/*Gender*/}

                                            <div className="mb-2 block mt-6">
                                                <Label htmlFor="gender" value="Gender" className={"uppercase text-gray-500 font-bold"}/>
                                            </div>
                                            <div role="group" aria-labelledby="my-radio-group" className={"flex"}>
                                                <div className="flex items-center gap-2">
                                                    <Field
                                                        type="radio"
                                                        id="female"
                                                        disabled={!edit}
                                                        name="gender"
                                                        value={"Female"}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <Label htmlFor="female" >Female</Label>
                                                </div>

                                                <div className="flex items-center gap-2 ml-2 ">
                                                    <Field type="radio"
                                                           id="male"
                                                           disabled={!edit}
                                                           name="gender"
                                                           value="Male"
                                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <Label htmlFor="male">Male</Label>
                                                </div>
                                            </div>
                                            {/*Email*/}
                                            <div className="mb-2 block mt-11">
                                                <Label htmlFor="email" className={"uppercase text-gray-500 font-bold"}>Email</Label>
                                            </div>
                                            <Field
                                                name="email"
                                                id='email'
                                                value={values.email}
                                                component={CustomInputText}
                                                type="email"
                                                edit={edit}
                                            />
                                            {/*company*/}
                                            <div className="mb-2 block mt-6">
                                                <Label htmlFor="phone" value="Company" className={"uppercase text-gray-500 font-bold"}/>
                                            </div>
                                            <Field
                                                id="company"
                                                name="company"
                                                value={values.company}
                                                component={CustomInputText}
                                                type="text"
                                                edit={edit}
                                            />
                                        </div>
                                        <div className={"col-span-12 md:col-span-6"}>
                                            {/*Last name*/}
                                            <div className="mb-2 block mt-6">
                                                <Label htmlFor="phone" value="LastName" className={"uppercase text-gray-500 font-bold"}/>
                                            </div>
                                            <Field
                                                id={"lastName"}
                                                name="lastName"
                                                value={values.lastName}
                                                component={CustomInputText}
                                                type="text"
                                                edit={edit}
                                            />

                                            {/*Phone number*/}
                                            <div className="mb-2 block mt-6">
                                                <Label htmlFor="phone" value="Phone Number" className={"uppercase text-gray-500 font-bold"}/>
                                            </div>
                                            <Field
                                                id="phone"
                                                name="phone"
                                                value={values.phone}
                                                component={CustomInputText}
                                                type="text"
                                                edit={edit}
                                            />

                                            {/*Address*/}
                                            <div className="mb-2 block mt-6">
                                                <Label htmlFor="name" value="Address" className={"uppercase text-gray-500 font-bold"}/>
                                            </div>
                                            <Field
                                                id="address"
                                                name="address"
                                                value={values.address}
                                                component={CustomInputText}
                                                type="text"
                                                edit={edit}
                                            />
                                            {/*position*/}
                                            <div className="mb-2 block mt-6">
                                                <Label htmlFor="name" value="Position" className={"uppercase text-gray-500 font-bold"}/>
                                            </div>
                                            <Field
                                                id="position"
                                                name="position"
                                                value={values.position}
                                                component={CustomInputText}
                                                type="text"
                                                edit={edit}
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <div className='flex justify-between items-center'>

                                        <span  pill type={"reset"}  onClick={() => setEdit(false)} className={edit ? "block cursor-pointer text-red-700" : "hidden"} >Cancel</span>


                                        <Button pill type={"button"} onClick={() => setEdit(true)}
                                                className={edit ? "hidden" : "block"}>
                                            <span className={"px-3 lg:px-8"}>Edit</span>
                                        </Button>

                                        <Button pill type={"submit"} className={edit ? "block" : "hidden"}>
                                            <span className={"px-3 lg:px-8"}>Update</span>
                                        </Button>
                                    </div>
                                    <div className={"mt-8"}>
                                        <FormChangePassword/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <UploadImgPf setOpenModal={setOpenModal} openModal={openModal}/>
        </SBHandleContent>
    )
}

export default SBSCPersonal;
const UploadImgPf = (props) => {
    return (
        <div>
            <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal('no')}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <AiOutlineCamera className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Do you really want to change your profile picture?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button  onClick={() => props.setOpenModal('yes')}>
                                Yes, I&apos;m sure
                            </Button>
                            <Button color="gray" onClick={() => props.setOpenModal('no')}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
