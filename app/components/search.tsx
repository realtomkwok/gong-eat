"use client"

import {MaterialIcon} from "@/app/components/material-icon";
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import React from "react";

export default function Search({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    function handleSearch(term: string) {
        const param = new URLSearchParams(searchParams)
        if (term) {
            param.set('query', term)
        } else {
            param.delete('query')
        }

        replace(`${pathname}?${param.toString()}`)
    }

    return (
        <div className="input-base min-w-90 bg-surfaceContainer">
            <div className="StateLayer hover:bg-stateSurfaceContainer transition-all h-full">
                <div className="flex flex-row justify-center items-center py-2 px-4 gap-2 self-stretch">
                    <MaterialIcon iconName={"search"} iconStyle={"rounded"} weight={600} opticalSize={20}
                                  fontSize={24}/>
                    <input
                        className="text-ellipsis block w-full bg-transparent border-0 placeholder:text-onSurfaceVariant focus:outline-none focus:w-96 focus:font-normal transition-all"
                        placeholder={placeholder}
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get('query')?.toString()}
                    />
                </div>
            </div>
        </div>
    )
}