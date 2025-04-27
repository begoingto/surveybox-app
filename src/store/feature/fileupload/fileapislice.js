import { apiSlice } from "@/store/api/apiSlice";


export const fileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (file) => {
                // const formData = new FormData();
                // formData.append("file", file);
                // console.log("file in rtk:", file)
                let formData =  new FormData();
                formData.append("file", file)
                return {
                    url: "/files",
                    method: "POST",
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                };
            },
        }),
    }),
});

export const { useUploadFileMutation } = fileApiSlice;
export default fileApiSlice;


