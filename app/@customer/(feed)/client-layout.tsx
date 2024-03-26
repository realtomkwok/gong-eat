'use client'

import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Tab, TabList, TabPanel, Tabs} from "@/app/components/tabs";
import {CategoryData} from "@/app/lib/data-type"
import Image from "next/image";
import getEmoji from "@/app/lib/get-emoji";
import {Button} from "@/app/components/button";
import TabCategory from "@/app/components/tab-category";

export interface LayoutProps {
    children: React.ReactNode
    modalRestaurant: React.ReactNode
    feed: React.ReactNode
    categories: CategoryData[]
}

export default function ClientLayout(props: LayoutProps) {
    return (
        <>
            <AnimatePresence mode="popLayout" initial={false}>
                {props.children}
                {props.modalRestaurant}
                <Tabs>
                    <div className="TabsContainer container mx-auto flex justify-around gap-12 my-8">
                        <TabCategory categories={props.categories} />
                        <div className="flex flex-row gap-4">
                            <Button icon={{iconName: "casino"}} />
                            <Button icon={{iconName: "filter_list"}} label="Filter" className="uppercase" />
                        </div>
                    </div>
                    <TabPanel>{props.feed}</TabPanel>
                </Tabs>
            </AnimatePresence>
        </>
    )
}