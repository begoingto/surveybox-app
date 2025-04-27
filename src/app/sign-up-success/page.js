import React from 'react';
import SBGetEmail from "@/app/sign-up-success/SBGetEmail";

export const metadata = {
    title: 'You successfully registered',
}

function Page() {

    return (
        <section className="max-w-screen-xl mx-auto px-5 xl:px-0">
            <div className="flex flex-col h-screen gap-y-2 items-center justify-center">
                <SBGetEmail />
            </div>
        </section>
    );
}

export default Page;