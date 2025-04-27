import React from 'react';
import {Button, Table} from "flowbite-react";
import {useGetThemeQuery} from "@/store/feature/admin/theme/themeAdminApiSlice";
import SBTableAdminSurveyCell from "@/app/admin/survey/SBTableAdminSurveyCell";
import SBTableAdminThemeCell from "@/app/admin/theme/SBTableAdminThemeCell";

function SbsAdminTheme(props) {

    const {data: themeData} = useGetThemeQuery();
    const themeList = themeData?.data
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <div className="flex md:order-2">
                        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search"
                                aria-expanded="false"
                                className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                          clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input
                                type="text"
                                id="search-navbar"
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search..."/>
                        </div>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <h1 className={'font-bold md:text-xl'}>Manage Theme</h1>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className={"mt-4"}/>
            </nav>
            <div className={"mt-6"}>
                <Button className={"bg-blue-700"}> + Add New </Button>
            </div>
            <div className={'overflow-x-auto mt-5'}>
                <Table hoverable>
                    {/* header row */}
                    <Table.Head>
                        <Table.HeadCell>id</Table.HeadCell>
                        <Table.HeadCell>name</Table.HeadCell>
                        <Table.HeadCell>created-by</Table.HeadCell>
                        <Table.HeadCell>background-Color</Table.HeadCell>
                        <Table.HeadCell>font</Table.HeadCell>
                        <Table.HeadCell>textColor</Table.HeadCell>
                        <Table.HeadCell>Active</Table.HeadCell>
                    </Table.Head>
                    {/* body row */}
                    {themeList?.list?.map((theme, index) => (
                        <SBTableAdminThemeCell key={theme.id} theme={theme} />
                    ))}
                </Table>
            </div>
        </>
    );
}

export default SbsAdminTheme;