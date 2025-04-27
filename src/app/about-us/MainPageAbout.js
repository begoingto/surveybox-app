'use client'

import React from 'react';
import SBAbout from "@/app/about-us/SBAbout";
import SBCardMentor from "@/app/about-us/SBCardMentor";
import SBCardMember from "@/app/about-us/SBCardMember";
import SbContacts from "@/app/about-us/SBContacts";
import PublicAboutLoading from "@/components/loading/PublicAboutLoading";
import {useSession} from "next-auth/react";

const desc ="is a powerful tool that can help you collect data from your target audience. With our platform,you can create surveys in minutes, distribute them to your audience, and collect data in real time.";
export const metadata = {
    title: 'About Us',
    description: desc,
}




function Page(props) {
    const {status } = useSession()
    if (status === "loading") {
        return <PublicAboutLoading />
    }
    const members = [
        {
            name:"Neuy Mich",
            position:"Full stack developer",
            image:"/images/about/member/mich.png",
            socials:{
                facebook:"https://web.facebook.com/neuy.mich",
                twitter:"https://twitter.com/begoingtoMe",
                github:"https://github.com/begoingto"
            }
        },
        {
            name:"Nun Somrithy",
            position:"front-end developer",
            image:"/images/about/member/rithy.png",
            socials:{
                facebook:"https://www.facebook.com/rith.bek.71",
                github:"https://github.com/Nun-SomRithy"
            }
        },
        {
            name:"Sorn Sophearum",
            position:"front-end developer",
            image:"/images/about/member/phearum.png",
            socials:{
                facebook:"https://www.facebook.com/sophearum.sorn/",
                twitter:"https://twitter.com/rum_sorn",
                github:"https://github.com/sophe4rum"
            }
        },
        {
            name:"lng Muyleang",
            position:"front-end developer",
            image:"/images/about/member/muyleng.png",
            socials:{
                facebook:"https://www.facebook.com/profile.php?id=100087853805063",
                twitter:"https://twitter.com/Mrrleang3",
                github:"https://github.com/MuyleangIng"
            }
        },{
            name:"Sin Many",
            position:"front-end developer",
            image:"/images/about/member/many.png",
            socials:{
                facebook:"https://www.facebook.com/manny.sin.56",
                github:"https://github.com/SINMANY"
            }
        },{
            name:"Lun limhai",
            position:"Back-end developer",
            image:"/images/about/member/hai.png",
            socials:{
                facebook:"https://www.facebook.com/ahhai12345/",
                twitter:"https://twitter.com/limhai172",
                github:"https://github.com/hai172212",
            }
        },{
            name:"Nhoem Ponleu",
            position:"Back-end developer",
            image:"/images/about/member/poler.png",
            socials:{
                facebook:"https://www.facebook.com/profile.php?id=100085308570923&mibextid=LQQJ4d",
                github:"https://github.com/NhoemPonleu?tab=repositories"
            }
        },{
            name:"Phon Sobon",
            position:"front-end developer",
            image:"/images/about/member/sobon.png",
            socials:{
                facebook:"https://www.facebook.com/sobon.phon",
                twitter:"https://twitter.com/home",
                github:"https://github.com/PhonSobon"
            }
        },
    ]
    const mentors = [
        {
            name:"Mom Reksmey",
            position:"front-end ",
            image:"/images/about/mentor/chermey.jpg",
            socials:{
                facebook:"https://web.facebook.com/mom.reksmey.12",
                github:"https://github.com/Reksmeys"
            }
        },
        {
            name:"Kay Keo",
            position:"Back-end ",
            image:"/images/about/mentor/Cherkeo.jpg",
            socials:{
                facebook:"https://web.facebook.com/profile.php?id=100009996454316",
                github:"https://github.com/keoKAY"
            }
        }
    ]
    return (
        <div>
            {/* content About us */}
            <SBAbout/>
            {/* CardMentor */}
            <section className="py-8 px-5 mx-auto max-w-screen-xl text-center lg:py-16 xl:px-0">
                <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                    <h2 className="mb-4 text-3xl tracking-tight text-blue-800 font-medium  dark:text-white ">Our Mentor</h2>
                </div>
                <div className="flex justify-center gap-16">
                    {mentors.map((user,i)=>{
                        return <SBCardMentor key={i}
                                             user={user}
                        />
                    })}
                </div>
            </section>
            {/* Card Member */}
            <section className="py-8 px-5 mx-auto max-w-screen-xl text-center text-blue-800 lg:py-16 xl:px-0">
                <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                    <h2 className="mb-4 text-3xl tracking-tight font-medium dark:text-white ">Our Awesome Team</h2>
                </div>
                <div className="grid gap-8 lg:gap-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {members.map((user,i)=>{
                        return <SBCardMember key={i}
                                             user={user}
                        />
                    })}
                </div>
            </section>
            {/* user contact to support team */}
            <SbContacts/>
        </div>
    );
}

export default Page;