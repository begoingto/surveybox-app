import React from 'react';
import MainPageAbout from "@/app/about-us/MainPageAbout";

const desc ="is a powerful tool that can help you collect data from your target audience. With our platform,you can create surveys in minutes, distribute them to your audience, and collect data in real time.";
export const metadata = {
    title: 'About Us',
    description: desc,
}
function Page(props) {
    return (
       <MainPageAbout/>

    );
}
export default Page;