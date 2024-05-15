'use client'

import NavIsland from "@/app/components/nav-island";
import {useThemeStore} from "@/app/providers/theme-store-provider";
import {useEffect} from "react";

export default function DetailPageLayout({children}: {children: React.ReactNode}) {
    const { setBackground } = useThemeStore((state => state))

    useEffect(() => {
        setBackground("bg-surfaceContainer")
    })

    return (
        <main className="container mx-auto pt-32">
            <NavIsland />
            {children}
        </main>
    )
}