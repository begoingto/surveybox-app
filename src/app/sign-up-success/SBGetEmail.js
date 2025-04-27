'use client'
import React, {useState} from 'react';
import {BsFillCheckCircleFill} from "react-icons/bs";

function SBGetEmail() {
    const [email, setEmail] = useState("");
    return (
        <>
            <BsFillCheckCircleFill className={"text-8xl md:text-9xl text-blue-700"} />
            <h1 className="text-2xl capitalize font-bold tracking-tight text-blue-700 text-center dark:text-blue-100">
                You successfully registered
            </h1>
            <p className="tracking-tight text-gray-500 text-center dark:text-blue-300 mx-72">
                Welcome to SurveyBox A confirmation email has been sent to {email.email},
                please click on the confirmation link in the email to activate your account.
            </p>
        </>
    );
}

export default SBGetEmail;