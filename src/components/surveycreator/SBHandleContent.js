import React, {createElement} from 'react';
import LoadingIndicator from "@/app/sign-in/components/LoadingIndicator";
import SBErrorHandling from "@/components/surveycreator/surveys/SBErrorHandling";
import {useSelector} from "react-redux";
import {selectLoadingLogout} from "@/store/feature/auth/AuthSlice";

function SbHandleContent({children,isLoading,error,disabledErrorCode,loadingComponent=LoadingIndicator,customLoadingContent,...props}) {
    const loading = useSelector(selectLoadingLogout)
    if (isLoading && loading){
        if (customLoadingContent) {
            return (
                <>
                    {customLoadingContent}
                </>
            )
        }else{
            return createElement(loadingComponent, props)
        }
    }

    if (error && !loading){
        if (disabledErrorCode!==error.status){
            switch (error.status) {
                case 400:
                    return (<SBErrorHandling message={"Bad request"} code={error.status}/>)
                case 401:
                    return (<SBErrorHandling message={"Unauthorized"} code={error.status}/>)
                case 404:
                    return (<SBErrorHandling message={"Not Found"} code={error.status}/>)
                case 403:
                    return (<SBErrorHandling message={"Forbidden"} code={error.status}/>)
                case 500:
                    return (<SBErrorHandling message={"Internal server error"} code={error.status}/>)
                default:
                    return (<SBErrorHandling message={"Something went wrong!!!"} code={error.status}/>)
            }
        }
    }
    return children;
}

export default SbHandleContent;