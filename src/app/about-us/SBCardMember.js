'use client';
import React from 'react';
import vision from "../../../public/images/about/vision.png"
import Image from "next/image";
import {Badge} from "flowbite-react";
function SBCardMember({user}) {
    return (
        <div className="text-center text-gray-500 dark:text-gray-400">
            <Image
                className="mx-auto mb-4 w-24 h-24 lg:w-36 lg:h-36 rounded-full md:w-28 md:h-28"
                src={user.image ? user.image : vision}
                alt="Bonnie Avatar"
                width={144}
                height={144}
            />
            <h3 className="mb-1 lg:text-2xl md:text-lg text-base text-black font-normal tracking-tight  dark:text-white">
                {user.name ? user.name :"Unknown"}
            </h3>
            <div className="flex justify-center">
                <Badge className="w-fit">
                    {user.position ?user.position :"Unknown"}
                </Badge>
            </div>
            <ul className="flex justify-center mt-4 space-x-4">
                {user.socials.facebook? (
                    <li>
                        <a href={user.socials.facebook} target="_blank" className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </a>
                    </li>):""}
                {user.socials.twitter?(
                    <li>
                        <a href={user.socials.twitter} target="_blank" className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                    </li>
                ):""}
                {user.socials.github?(
                    <li>
                        <a href={user.socials.github} target="_blank" className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </a>
                    </li>
                ):""}

            </ul>
        </div>
    );
}

export default SBCardMember;