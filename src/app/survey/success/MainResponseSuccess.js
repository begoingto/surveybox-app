'use client'
import React from 'react';
import {Card} from "flowbite-react";
import {useWindowSize} from "usehooks-ts";
import Confetti from "react-confetti";
import {BsFillCheckCircleFill} from "react-icons/bs";
import Link from "next/link";

function MainResponseSuccess({searchParams}) {
    const { uuid } = searchParams
    const { width, height } = useWindowSize()

    return (
        <section className={"h-[100vh]"}>
            <Confetti
                width={width}
                height={height}
                drawShape={ctx => {
                    ctx.beginPath()
                    for(let i = 0; i < 22; i++) {
                        const angle = 0.35 * i
                        const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
                        const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
                        ctx.lineTo(x, y)
                    }
                    ctx.stroke()
                    ctx.closePath()
                }}
            />
            <div className={"flex items-center justify-center flex-col h-full"}>
                <Card className={"!shadow-none !border-0 relative !m-0"}>
                    <div className={"text-center"}>
                        <div className={"flex justify-center mb-3"}>
                            <BsFillCheckCircleFill className={"w-32 h-32 text-green-600 dark:text-green-400"} />
                        </div>
                        <h1 className="text-green-600 dark:text-green-400 text-2xl font-extrabold uppercase mb-2">Completed!
                        </h1>
                        <p className="text-lg leading-relaxed dark:text-gray-300">
                            Your response will be graded. You are all set. Well done!
                        </p>
                        <div className="flex space-x-4 mt-4 justify-center">
                            {uuid && (<Link href={`/survey/response/${uuid}`} className={"text-blue-500 text-base font-medium"}>Back to survey again</Link>)}
                            {/*<Button color={"failure"} >Exit</Button>*/}
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}

export default MainResponseSuccess;