'use client'

import {Button} from "@/app/components/button";

export const Stepper = () => {
    return (
        <div className="flex flex-row gap-2.5">
            <Button icon={{iconName: "plus", iconStyle: "rounded", weight: 600, opticalSize: 20}}/>
            <span className="text-2xl font-semibold">1</span>
            <Button icon={{iconName: "minus", iconStyle: "rounded", weight: 600, opticalSize: 20}}/>
        </div>
    )
}