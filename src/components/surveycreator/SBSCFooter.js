import React from 'react';
import Link from "next/link";

function SBSCFooter() {
    return (
        <footer className="bg-white dark:bg-gray-900 my-4  text-center ">
            <hr className="border-gray-200 dark:border-gray-700 lg:my-8"/>
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link
                href="https://web.facebook.com/begoingto.me" target={"_blank"} className="hover:underline">Surveybox™</Link>. All Rights Reserved.</span>
        </footer>
    );
}

export default SBSCFooter;