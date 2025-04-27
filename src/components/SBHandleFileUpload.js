import React, {useCallback, useEffect, useState} from 'react';
import {useUploadFileMutation} from "@/store/feature/fileupload/fileapislice";

function SbHandleFileUpload() {
    const [uploadFile,{isLoading }] = useUploadFileMutation();
    const [file, setFile] = useState(null);



    useEffect(() => {
        handleUpload(fileUpload).then(r => console.log(r));
    }, [fileUpload, handleUpload]);

    return {
        file,
    };
}

export default SbHandleFileUpload;