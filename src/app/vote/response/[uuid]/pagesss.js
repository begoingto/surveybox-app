// import React from 'react'
// import {fileImgUrl} from "@/lib/fileBase";
// import {getVoteBy} from "@/app/vote/response/(data)/responseAPI";
// import MainResponse from "@/app/vote/response/MainResponse";
//
//
// export async function generateMetadata({ params, searchParams }, parent) {
//     // read route params
//     const uuid = params.uuid
//
//     const vote = await getVoteBy(uuid)
//     const previousOpenGraph = (await parent).openGraph || []
//     const previousTwitter = (await parent).twitter || []
//
//     return {
//         title: vote.title +' - SURVEYBOX',
//         openGraph:{
//             ...previousOpenGraph,
//             title: vote.title +' - SURVEYBOX',
//             images: [
//                 fileImgUrl(vote.qrCode),
//                 ...previousOpenGraph.images
//             ]
//         },
//         twitter: {
//             ...previousTwitter,
//             title: vote.title +' - SURVEYBOX',
//             images: [
//                 fileImgUrl(vote.qrCode),
//                 ...previousOpenGraph.images
//             ]
//         }
//     }
// }
//
// function Page({params}) {
//
//     return (
//         <>
//             <MainResponse params={params} />
//
//             <hr/>
//             <p className={"my-5 text-center"}>
//                 © 2023 SurveyBox | . All rights reserved.
//             </p>
//         </>
//
//     )
// }
//
// export default Page;