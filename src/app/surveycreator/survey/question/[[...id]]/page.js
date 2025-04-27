import React from 'react';
import MainQuestionForm from "@/app/surveycreator/survey/question/MainQuestionForm";
export const metadata = {
    title: 'Question',
}
function Page({params}) {
    return (
      <MainQuestionForm params={params}/>
    );
}
export default Page;