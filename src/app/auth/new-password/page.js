import React from 'react';
import SBNewPwd from "@/app/auth/new-password/components/SBNewPwd";
import Image from "next/image";

export const metadata = {
    title: 'New Password',
}

function Page() {
    return (
        <section className="my-8 sm:my-10 2xl:my-0">
            <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:h-[90vh] 2xl:gap-24 items-center ">
            <div className="mb-6 lg:mb-0">
                <div className="space-y-4 md:space-y-6">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-blue-800 text-center dark:text-blue-100 mb-3">
                        New Password
                    </h1>
                            <SBNewPwd />

                </div>
            </div>
            <div>
                <Image className={"w-full"} unoptimized width={100} height={100} src="/images/newpwd/new-password.png" alt="newpassword_image"/>
            </div>
        </div>
            </div>
        </section>

    );
}

export default Page;