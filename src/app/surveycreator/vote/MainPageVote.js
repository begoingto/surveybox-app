'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {IoAddSharp} from "react-icons/io5";
import { useLazyGetVoteQuery} from "@/store/feature/vote/voteApiSlice";
import SCVote from "@/app/surveycreator/vote/SCVote";
import {Button, Pagination} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {addVote, addVoteResultSets} from "@/store/feature/vote/voteSlice";
import {DISPLAY} from "@/lib/siteConfig";
import {BsFillGridFill, BsListUl} from "react-icons/bs";
import {addDisplay, selectDisplay} from "@/store/feature/config/displaySlice";
import {useDebounce} from "usehooks-ts";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import MainPageVoteLoading, {VoteLoadingItems} from "@/components/loading/surveycreatorloading/MainPageVoteLoading";
import {useSession} from "next-auth/react";


function MainPageVote(props) {
    const { loading } = useSession()
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState(null);
    const debouncedSearch = useDebounce(searchTerm, 1000)
    const [display, setDisplay] = useState(useSelector(selectDisplay))
    const [fetchVotes, {data: res,isLoading, isFetching,error}] = useLazyGetVoteQuery()

    useEffect(() => {
       fetchVotes({
           _page: 1,
           _limit: 5,
           filters: {
               sortBy: 'id',
               sortDirection: 'desc'
           }
       })
        dispatch(addVote(null))
        dispatch(addVoteResultSets([]));
    },[dispatch, fetchVotes])
    useEffect(() => {
        if(searchTerm){
            fetchVotes({
                page: 1,
                limit:5,
                filters: {
                    sortBy: 'id',
                    sortDirection: 'desc',
                    title: searchTerm.trim()
                }
            })
        }
    },[fetchVotes, searchTerm,debouncedSearch])
    const handlePagination = (page) => {
        fetchVotes({
            _page: page,
            _limit: 5
        })
    }
    const handleSearch =(e) => {
        setSearchTerm(e.target.value)
    }
    const handleDisplay = (display) => {
        dispatch(addDisplay(display))
        setDisplay(display)
    }

    return (
        <SBHandleContent
            isLoading={loading}
            error={error}
            customLoadingContent={<MainPageVoteLoading/>}
        >
            <section className={"mt-5"}>
                <div className="flex flex-col-reverse sm:grid sm:grid-cols-6 items-center justify-between gap-3 my-5 px-5">
                    <div className="relative text-gray-600 focus-within:text-gray-400 w-full sm:w-auto sm:col-span-4 lg:col-span-3">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                     viewBox="0 0 24 24" className="w-6 h-6">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </span>
                        <input
                            id="searchInput"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => handleSearch(e)}
                            className="py-2 text-sm text-white dark:text-gray-100 dark:bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
                            placeholder="Search..."
                        />
                    </div>
                    <div className={"flex space-x-2 sm:col-span-2 lg:col-span-3 justify-end"}>
                        <Button type={"button"} color={display === DISPLAY.grid? "dark": "light"} disabled  onClick={() => handleDisplay(DISPLAY.grid)}>
                            <BsFillGridFill />
                        </Button>
                        <Button type={"button"} color={display === DISPLAY.list? "dark": "light"} disabled   onClick={() => handleDisplay(DISPLAY.list)}>
                            <BsListUl />
                        </Button>
                    </div>
                </div>
                {/* End Search */}

                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                {/* End Search */}
                <div className={"grid items-center justify-center grid-cols-12 gap-4 px-5 lg:px-5"}>
                    <Link href={"/surveycreator/vote/setting-up"} className= {  searchTerm ? "hidden" : "block col-span-12 lg:col-span-6 md:h-[8.5rem] h-[8.5rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"}>
                        <div className={"flex justify-center items-center mt-14 gap-3"}>
                            <IoAddSharp/> <span>Add new</span>
                        </div>
                    </Link>
                    {isLoading || isFetching ? (
                        <VoteLoadingItems/>
                    ) : res?.data?.list.map((vote, i) => <SCVote key={i} vote={vote}/>)}
                </div>
                {/*  Pagination  */}
                <div className="flex justify-center my-3">
                        <Pagination
                            currentPage={res?.data?.pagination?.number+1 || 1}
                            onPageChange={page => handlePagination(page)}
                            showIcons
                            totalPages={res?.data?.pagination?.totalPages || 1}
                        />
                </div>
                {/*  End Pagination  */}
            </section>

        </SBHandleContent>
    );
}

export default MainPageVote;