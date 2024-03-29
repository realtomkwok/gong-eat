'use client'

import {useEffect} from "react";
import {useThemeStore} from "@/app/providers/theme-store-provider";

export default function Layout({children}: {children: React.ReactNode}) {
    const {background, setBackground } = useThemeStore((state => state))

    useEffect(() => {
        setBackground("bg-surfaceDim")
    })

    return (
        <>
            {children}
        </>
    )
}