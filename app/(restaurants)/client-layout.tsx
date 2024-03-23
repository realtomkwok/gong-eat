'use client'

import React, {forwardRef, ElementRef, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import FrozenRouter from "@/app/components/frozen-router";
import {useSelectedLayoutSegment, useSelectedLayoutSegments} from "next/navigation";
import NavIsland from "@/app/components/nav-island";

export interface LayoutProps {
    children: React.ReactNode
    modal: React.ReactNode
}

const Child = forwardRef<
    ElementRef<typeof motion.div>,
    { children: React.ReactNode }
>((props, ref) => {
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
        >
            <FrozenRouter>{props.children}</FrozenRouter>
        </motion.div>
    )
})

Child.displayName = "Child"

export const ClientLayout = (props: LayoutProps) => {
    const segment = useSelectedLayoutSegment()
    const segments = useSelectedLayoutSegments("modal")

    const [restaurantModalShown, setRestaurantModalShown] = useState(false)

    useEffect(() => {
        const isShown = segments.join("") !== "__DEFAULT__"
        document.querySelector(".Base")?.classList.toggle("overflow-hidden", isShown)
        setRestaurantModalShown(isShown)
    }, [segments]);

    return (
        <div className="bg-surface ">
            <NavIsland />
            <AnimatePresence mode="popLayout" initial={false}>
                <Child key={segment} >{props.children}</Child>
                {restaurantModalShown && props.modal}
            </AnimatePresence>
            <footer className="p-6" />
        </div>
    );
}