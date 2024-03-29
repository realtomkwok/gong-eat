'use client'

import React, {useEffect} from "react";
import {useThemeStore} from "@/app/providers/theme-store-provider";

export default function CustomerLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen">
            <main>
                {children}
                <footer className="p-6">Footer</footer>
            </main>
        </div>
    )
}
