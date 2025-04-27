import React from 'react';
import SbSignUp from "@/app/sign-up/SBSignUp";
import Outlet from "@/middleware/Outlet";

export const metadata = {
    title: 'Register Account',
}

function Page() {
    return (
        <Outlet>
            <section className="my-8 sm:my-10 2xl:my-0">
                <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
                    <SbSignUp />
                </div>
            </section>
        </Outlet>
    );
}

export default Page;