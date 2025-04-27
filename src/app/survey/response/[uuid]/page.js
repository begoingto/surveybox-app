import React from 'react'
import MainResponse from "@/app/survey/response/MainResponse";
import {fileImgUrl} from "@/lib/fileBase";
import {getSurveyBy} from "@/store/feature/response/responseAPI";
import {sleep} from "@/lib/siteConfig";


export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const uuid = params.uuid
    // read query params
    const survey = await getSurveyBy(uuid)
    // const previousOpenGraph = (await parent).openGraph || []
    // const previousTwitter = (await parent).twitter || []
    await sleep(2000)

    return {
        title: survey.title,
        description: survey.description? survey.description : "Collect better data and make better decisions.",
        openGraph:{
            // ...previousOpenGraph,
            title: survey.title,
            description: survey.description ? survey.description : "Collect better data and make better decisions.",
            images: [
                {
                    url: survey.cover ? fileImgUrl(survey.cover) : `/images/survey/response.png`,
                    width: 800,
                    height: 600,
                }
                // ...previousOpenGraph.images
            ]
        },
        twitter: {
            // ...previousTwitter,
            title: survey.title,
            description: survey.description? survey.description : "Collect better data and make better decisions.",
            images: [
                // fileImgUrl(survey.qrCode),
                // ...previousOpenGraph.images
                survey.cover ? fileImgUrl(survey.cover) :`/images/survey/response.png`,
            ]
        }
    }
}

 function Page({params}) {
    return (<MainResponse params={params} />)
}

export default Page;