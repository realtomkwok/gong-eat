"use client"

import {MaterialIcon} from "@/app/components/material-icon";

export default function Search({placeholder}: { placeholder: string }) {
    function handleSearch(term: string) {
        console.log(term)
    }

    return (
        <div className="input-base min-w-90">
            <div className="StateLayer hover:bg-stateOnSecondContainer transition-all h-full">
                <div className="flex flex-row justify-center items-center py-2 px-4 gap-2 self-stretch">
                    <MaterialIcon iconName={"search"} iconStyle={"rounded"} weight={600} opticalSize={20}
                                  fontSize={24}/>
                    <input
                        className="text-ellipsis block w-full bg-transparent border-0 placeholder:text-onSurfaceVariant focus:outline-none focus:w-96 focus:font-normal transition-all"
                        placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)}/>

                </div>
            </div>
        </div>
    )
}