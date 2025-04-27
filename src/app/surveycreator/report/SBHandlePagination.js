import React, {useState} from 'react';
import {Pagination} from "flowbite-react";
import LoadingIndicator from "@/app/sign-in/components/LoadingIndicator";

function SbHandlePagination({data,isLoading,onPageChange, defaultPerPage=10, selectBg}) {

    const [perPage, setPerPage] = useState(data?.pageSize || defaultPerPage)

    if (isLoading){
        return <LoadingIndicator />
    }

    return (
        <div className={"flex flex-wrap justify-center lg:justify-between sb-pagination"}>
            <div className={"flex items-center"}>
                <p className={"text-sm text-gray-700 dark:text-gray-400 mr-2"}>
                    Showing {data?.startRow || 0} to {data?.endRow || 0} of {data?.total || 0} entries
                </p> |
                <select name="perPage" id="perPage"
                        defaultValue={perPage}
                        className={(selectBg ? selectBg : "dark:bg-gray-800") + " bg-white border-0 text-gray-900 text-sm rounded-lg focus:ring-0 block dark:border-gray-800 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-0"}
                        onChange={(e) => {
                            setPerPage(e.target.value)
                            onPageChange({page: 1, perPage: e.target.value})
                        }}
                >
                    <option value={defaultPerPage}>{defaultPerPage} entries</option>
                    <option value="25">25 entries</option>
                    <option value="50">50 entries</option>
                    <option value="100">100 entries</option>
                </select>
            </div>
            <Pagination
                currentPage={data?.pageNum || 1}
                onPageChange={(page) => onPageChange({page, perPage})}
                showIcons
                totalPages={data?.pages || 1}
            />
        </div>
    );
}

export default SbHandlePagination;