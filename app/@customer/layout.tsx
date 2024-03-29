'use client'

import React from "react";
import NavIsland from "@/app/components/nav-island";

export default function CustomerLayout({children}: {children: React.ReactNode}) {

    return (
        <div className="bg-surface min-h-screen">
            <NavIsland />
            <main className="pt-32">
                {children}
            </main>
            <footer className="p-6">Footer</footer>
        </div>
    )
}
