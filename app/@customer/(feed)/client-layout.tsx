'use client'

import React, {useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {TabPanel, Tabs} from "@/app/components/tabs";
import {CategoryData} from "@/app/lib/data-type"
import {Button} from "@/app/components/button";
import TabCategory from "@/app/components/tab-category";
import {usePathname} from "next/navigation";
import NavIsland from "@/app/components/nav-island";
import {useThemeStore} from "@/app/providers/theme-store-provider";

export interface LayoutProps {
    children: React.ReactNode
    modalRestaurant: React.ReactNode
    feed: React.ReactNode
    categories: CategoryData[]
}

export default function ClientLayout(props: LayoutProps) {
    const currentPathName = usePathname()
    const {background, setBackground } = useThemeStore((state => state))

    useEffect(() => {
        setBackground("bg-surface")
    })

    return (
        <div className="relative pt-32">
            <NavIsland />
            <AnimatePresence mode="popLayout" initial={false}>
                {props.children}
                {props.modalRestaurant}
                <Tabs>
                    <div className="TabsContainer container mx-auto flex justify-around gap-12 pb-8">
                        <TabCategory categories={props.categories} currentPath={currentPathName}/>
                        <div className="flex flex-row gap-4">
                            <Button icon={{iconName: "casino"}} />
                            <Button icon={{iconName: "filter_list"}} label="Filter" className="uppercase" />
                        </div>
                    </div>
                    <TabPanel>{props.feed}</TabPanel>
                </Tabs>
            </AnimatePresence>
        </div>
    )
}