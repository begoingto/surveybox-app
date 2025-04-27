import './globals.css'
import {Kantumruy_Pro} from 'next/font/google'
import React from "react";
import LayoutMainPage from "@/components/LayoutMainPage";
import Script from "next/script";
const kantumruyPro = Kantumruy_Pro({
    subsets: ['khmer']
})
export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
    manifest: process.env.NEXT_PUBLIC_APP_URL+"/icons/manifest.json",
    title: {
        template: '%s - SURVEYBOX'
    },
    openGraph:{
        title: 'Home - SURVEYBOX',
        description: 'Collect better data and make better decisions.',
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
            template: '%s - SURVEYBOX'
        },
        description: 'Collect better data and make better decisions.',
        creator: 'SurveyBox Team ',
        images: [
            "/og-image-surveybox.jpg"
        ],
    }
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-R6EJ4PG11X"></Script>
            <Script id="surveybox" strategy="lazyOnload">
                {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-R6EJ4PG11X');`}
            </Script>
        </head>
        <body className={kantumruyPro.className + " dark:bg-gray-900 dark:text-white"}>
           <LayoutMainPage>{children} </LayoutMainPage>
        </body>
        </html>
    )
}