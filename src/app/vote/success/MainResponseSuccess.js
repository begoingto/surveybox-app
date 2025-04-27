'use client'
import React from 'react';
import {Card} from "flowbite-react";
import {useWindowSize} from "usehooks-ts";
import Confetti from "react-confetti";
import {BsFillCheckCircleFill} from "react-icons/bs";

function MainResponseSuccess() {

    const { width, height } = useWindowSize()

    return (
        <section className={"h-[100vh]"}>
            <Confetti
                width={width}
                height={height}
                drawShape={ctx => {
                    ctx.beginPath();
                    const confettiSize = 8;
                    const confettiLength = 20;
                    for (let i = 0; i < confettiLength; i++) {
                        const angle = (i / confettiLength) * (2 * Math.PI);
                        const x = (1.5 * Math.cos(angle)) * confettiSize;
                        const y = (1.5 * Math.sin(angle)) * confettiSize;
                        ctx.rect(x, y, confettiSize, confettiSize);
                        ctx.fill();
                    }
                    ctx.stroke()
                    ctx.closePath()
                }}
            />
            <div className={"flex items-center justify-center flex-col h-full"}>
                <Card className={"!shadow-none !border-0 relative !m-0"}>
                    <div className={"text-center"}>
                        <div className={"flex justify-center mb-3"}>
                            <BsFillCheckCircleFill className={"w-32 h-32 text-blue-500 dark:text-green-400"} />
                        </div>
                        <h1 className="text-blue-500 dark:text-blue-400 text-2xl font-extrabold uppercase mb-2">Completed!
                        </h1>
                        <p className="text-lg leading-relaxed dark:text-gray-300">
                            Your response will be graded. You are all set. Well done!
                        </p>
                    </div>
                </Card>
            </div>
        </section>
    );
}

export default MainResponseSuccess;