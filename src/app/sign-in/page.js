import React from 'react';
import SBSignIn from "@/app/sign-in/SBSignIn";
import Outlet from "@/middleware/Outlet";
export const metadata = {
    title: 'Login Account',
}

function Page() {
    return (
        <Outlet>
            <section className="my-8 sm:my-10 2xl:my-0">
                <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
                    <SBSignIn />
                </div>
            </section>
        </Outlet>
    );
}

export default Page;