import React from 'react'
import {fileImgUrl} from "@/lib/fileBase";
import MainResponse from "@/app/vote/response/MainResponse";
import {getVoteBy} from "@/store/feature/responsevote/responseAPI";


export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const uuid = params.uuid

    const vote = await getVoteBy(uuid)
    const previousOpenGraph = (await parent).openGraph || []
    const previousTwitter = (await parent).twitter || []
    return {
        title: vote.title +' - SURVEYBOX',
        openGraph:{
            ...previousOpenGraph,
            title: vote.title +' - SURVEYBOX',
            images: [
                fileImgUrl(vote.qrCode),
                ...previousOpenGraph.images
            ]
        },
        twitter: {
            ...previousTwitter,
            title: vote.title +' - SURVEYBOX',
            images: [
                fileImgUrl(vote.qrCode),
                ...previousOpenGraph.images
            ]
        }
    }
}
function Page({params}) {
    return (
        <>
            <MainResponse params={params} />
        </>

    )
}

export default Page;