'use client'
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function FormComponent() {
    const [formState, setFormState] = useState({
        // Your form fields here...
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if the cookie exists (indicating that the user has already submitted the form)
        if (Cookies.get('formSubmitted')) {
            return;
        }

        // If the cookie does not exist, proceed with form submission
        try {
            // Your form submission logic here...

            // After successful form submission, set a cookie to track the user's submission
            Cookies.set('formSubmitted', true, { expires: 365 }); // Set the cookie to expire in 365 days
        } catch (error) {
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Your form fields here... */}
            <button type="submit">Submit</button>
        </form>
    );
}
