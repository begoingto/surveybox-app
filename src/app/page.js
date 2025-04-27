import React from "react";
import SBHomePage from "@/components/SBHomePage";

const desc = "Collect better data and make better decisions."
export const metadata = {
    title: 'Home - SURVEYBOX ',
    description: desc,
    locale: 'en-US',
    category: 'SurveyBox',
    type: 'website',
    siteName: 'SURVEYBOX',
    openGraph:{
        title: 'Home - SURVEYBOX',
        description: desc,
        url: '/',
        siteName: 'SURVEYBOX',
        images: [
            {
                url: "/og-image-surveybox.jpg",
                width: 800,
                height: 600,
            },
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: {
            template: 'Home - SURVEYBOX'
        },
        description: desc,
        creator: 'SurveyBox Team ',
        images: [
            "/og-image-surveybox.jpg"
        ],
    }
}
export default function Home() {
    return (
        <>
           <SBHomePage/>
        </>
    )
}
