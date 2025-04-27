'use client'
import React from 'react';
import {Breadcrumb} from "flowbite-react";
import {MdDashboard} from "react-icons/md";
import Link from "next/link";

function SbBreadcrumb(props) {
    return (
        <>
            <Breadcrumb
                aria-label="Solid background breadcrumb example"
                className="bg-gray-50 px-5 py-3 dark:bg-gray-900"
            >
                <Breadcrumb.Item
                    href="#"
                    as={Link}
                    icon={MdDashboard}
                >
                    <p>
                        Dashboard
                    </p>
                </Breadcrumb.Item>
                <Breadcrumb.Item
                    as={Link}
                    href="#"
                >
                    Projects
                </Breadcrumb.Item>
                <Breadcrumb.Item
                    as={Link}
                    href="#"
                >
                    Surveybox
                </Breadcrumb.Item>
            </Breadcrumb>
        </>
    );
}

export default SbBreadcrumb;