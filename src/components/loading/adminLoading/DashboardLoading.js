import React from 'react';
import {Breadcrumb} from "flowbite-react";
import {MdDashboard} from "react-icons/md";

function DashboardLoading() {
    return (
        <>
            <Breadcrumb
                aria-label="Solid background breadcrumb example"
                className="bg-gray-50 px-5 py-3 dark:bg-gray-900">
                <div

                    icon={MdDashboard}
                >
                    <p>
                        Dashboard
                    </p>
                </div>
                <Breadcrumb.Item

                >
                    Projects
                </Breadcrumb.Item>
                <Breadcrumb.Item

                >
                    Surveybox
                </Breadcrumb.Item>
            </Breadcrumb>
        </>
    );
}

export default DashboardLoading;