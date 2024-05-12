'use client'

import {useThemeStore} from "@/app/providers/theme-store-provider";
import {useEffect} from "react";

export default function CheckoutLayout({children}: {children: React.ReactNode}) {
    const {setBackground} = useThemeStore((state) => state)

    useEffect(() => {
        setBackground("bg-surfaceContainer")
    })


    return (
        <>
            {children}
        </>
    )
}