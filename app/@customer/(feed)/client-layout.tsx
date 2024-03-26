'use client'

import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Tab, TabList, TabPanel, Tabs} from "@/app/components/tabs";

export interface LayoutProps {
    children: React.ReactNode
    modalRestaurant: React.ReactNode
    feed: React.ReactNode
}

export default function ClientLayout(props: LayoutProps) {
    return (
        <>
            <AnimatePresence mode="popLayout" initial={false}>
                {props.children}
                {props.modalRestaurant}
                <Tabs>
                    <TabList>
                        <Tab href="/">all</Tab>
                        <Tab href="/category/chinese">Chinese</Tab>
                        <Tab href="/category/italian">Italian</Tab>
                    </TabList>
                    <TabPanel>{props.feed}</TabPanel>
                </Tabs>
            </AnimatePresence>
        </>
    )
}