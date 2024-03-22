'use client'

import React from "react"
import Image from "next/image";
import getEmoji from "@/app/lib/get-emoji";
import {Button} from "@/app/components/button";
import Link from "next/link";

export interface CategoryData {
    props: {
        category_id: number
        category_name: string
        category_icon: string
        category_slug: string
    }[]
}


export const NavCategory: React.FC<CategoryData> = ({props}) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const [isAtStart, setIsAtStart] = React.useState(true)

    const handleScroll = () => {
        const scrollContainer = scrollContainerRef.current
        if (scrollContainer) {
            if (isAtStart) {
                scrollContainer.scrollBy({left: scrollContainer.scrollWidth, behavior: "smooth"})
                setIsAtStart(false)
            } else {
                scrollContainer.scrollBy({left: -scrollContainer.scrollWidth, behavior: "smooth"})
                setIsAtStart(true)
            }
        }
    }


    return (
        <div className="flex relative w-10/12 items-center h-full">
            {/*<div className="absolute z-10 flex justify-between w-full h-full">*/}
            {/*        <Button className={`-translate-x-4 ${isAtStart ? `visible` : `hidden`}`} icon={{iconName: "chevron_left"}} onClick={handleScroll}/>*/}
            {/*        <Button className={`translate-x-4 ${!isAtStart ? `visible` : `hidden`}`} icon={{iconName: "chevron_right"}} onClick={handleScroll}/>*/}
            {/*</div>*/}
                <div className="flex flex-row gap-12 flex-nowrap items-center overflow-x-scroll" ref={scrollContainerRef}>
                    {props.map((item, key) => (
                        <Link href={item.category_slug} key={item.category_id}>
                            <div className="CategoryContainer flex flex-col items-center py-2 gap-2 w-16 ">
                                <div className="relative">
                                    <Image
                                        src={getEmoji(item.category_icon, "color")}
                                        alt={item.category_name}
                                        width={64}
                                        height={64}
                                    />
                                </div>
                                <span
                                    className="text-sm font-semibold uppercase tracking-wider text-nowrap">{item.category_name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
        </div>
    )
}