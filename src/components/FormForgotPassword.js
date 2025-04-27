import { Button, Label, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import LoadingIndicator from '@/app/sign-in/components/LoadingIndicator';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useForgotPasswordMutation } from '@/store/feature/auth/authApiSlice';

function FormForgotPassword() {
    const [openModal, setOpenModal] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [modalMessage, setModalMessage] = useState({ type: '', content: '' });
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const handleSubmit = async (values, { setErrors }) => {
        try {
            setLoadingSubmit(true);
            setErrors({});
            const isValid = await validationSchema.validate(values);

            if (isValid) {
                const { data } = await forgotPassword(values);
                setModalMessage({
                    type: 'success',
                    content: 'Password reset email sent. Please check your email.',
                });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.code === '404') {
                setModalMessage({
                    type: 'error',
                    content: 'Failed to send password reset email. Please try again.',
                });
            } else {
                setModalMessage({
                    type: 'error',
                    content: 'Failed to send password reset email.Please Check Your Account Available or not',
                });
            }
        } finally {
            setLoadingSubmit(false);
            setOpenModal(true);
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setModalMessage({ type: '', content: '' });
    };

    return (
        <>
            <a className="text-sm text-cyan-700 hover:underline dark:text-cyan-500" onClick={() => setOpenModal(true)}>
                Can&apos;t Access Your Account?
            </a>
            <Modal show={openModal} size="md" popup onClose={closeModal}>
                <Modal.Header />
                <Modal.Body>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Forgot Password</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="email" value="Your email" />
                                        </div>
                                        <Field
                                            id="email"
                                            name="email"
                                            placeholder="name@gmail.com"
                                            type="email"
                                            as={TextInput}
                                        />
                                        <ErrorMessage name="email" component="span" className="text-red-500" />
                                    </div>
                                    <div className="w-full">
                                        <Button type="submit" disabled={loadingSubmit || isLoading}>
                                            {loadingSubmit || isLoading ? <LoadingIndicator width={5} height={5} /> : null}
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                {modalMessage.type && (
                    <Modal.Footer>
                        <div className={modalMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}>
                            {modalMessage.content}
                        </div>
                        <Button className={'danger'} onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
}

export default FormForgotPassword;
