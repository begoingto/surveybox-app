'use client'
import {useState} from "react";
import {useVerifyEmailMutation} from "@/store/feature/auth/authApiSlice";





function VerifyEmailForm() {
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleVerifyEmail = () => {
        const redirectUrl = encodeURIComponent("http://localhost:3000/sign-up-success");
        const gmailVerificationUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&su=Email%20Verification&body=Click%20the%20link%20below%20to%20verify%20your%20email:%0D%0A%0D%0Ahttps%3A%2F%2Fexample.com%2Fverify%3Femail%3D${email}%26redirect%3D${redirectUrl}`;
        window.location.href = gmailVerificationUrl;
    };

    return (
        <form>
            <label>
                Email Address:
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </label>
            <button type="button" onClick={handleVerifyEmail}>Verify Email</button>
        </form>
    );
}

export default VerifyEmailForm;
