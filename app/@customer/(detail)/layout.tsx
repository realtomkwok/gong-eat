import NavIsland from "@/app/components/nav-island";
import React from "react";

export default function DetailPageLayout({children}: {children: React.ReactNode}) {
    return (
        <main className="pt-32">
            <NavIsland />
            {children}
        </main>
    )
}