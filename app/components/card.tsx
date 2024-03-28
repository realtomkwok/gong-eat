'use client'

import Image from "next/image";
import React from "react";
import {motion, MotionProps} from "framer-motion";
import {MaterialIcon} from "@/app/components/material-icon";
import {emphasizedEasing_Medium} from "@/app/lib/motion-config";
import {useItemStore} from "@/app/providers/item-store-provider";
import {MenuItemData} from "@/app/lib/data-type";
import Stepper from "@/app/components/stepper";

interface CardProps {
    title: string
    subtitle: string
    description?: string
    imageSrc?: string
}

interface CardContainerProps extends MotionProps {
    children: React.ReactNode
}

const CardContainer: React.FC<CardContainerProps> = ({children, ...rest}) => {
    return (
        <motion.div
            className="CardContainer bg-surface border border-outlineVariant rounded-2xl overflow-hidden"
            {...rest}
        >
            <div className="StateLayer w-full h-full hover:bg-surfaceVariant transition-all">
                {children}
            </div>
        </motion.div>
    )
}

interface CardRestaurantProps extends CardProps {
    rating: number
}

export const Card_Restaurant: React.FC<CardRestaurantProps> = (props: CardRestaurantProps) => {
    const Rating = (props: { rating: number }) => {
        return <div className="flex flex-row items-center gap-0.5">
            <MaterialIcon className="" iconName={"star"} iconStyle={"rounded"} weight={600} grade={-25} opticalSize={20}
                          fontSize={16}/>
            <span className="card-subtitle -translate-y-[1px]">{props.rating}</span>
        </div>;
    }

    return (
        <CardContainer whileTap={{scale: 0.95, transition: emphasizedEasing_Medium}}>
            <motion.div className="Card flex flex-col items-start self-stretch"
            >
                <div className="ImageContainer relative w-full aspect-square">
                    {props.imageSrc && <Image src={props.imageSrc} alt={props.title} fill style={{objectFit: "cover"}}
                                              sizes="500px, 500px"/>}

                </div>
                <div className="TextContainer w-full flex flex-col gap-2 px-4 py-6 ">
                    <div className="flex flex-row items-baseline justify-between">
                        <p className="card-title">{props.title}</p>
                        {props.rating && <Rating rating={props.rating}/>}
                    </div>
                    <p className="card-subtitle uppercase">{props.subtitle}</p>
                </div>
            </motion.div>
        </CardContainer>
    )
}

interface CardMenuItemProps extends CardProps {
    rawData: MenuItemData
}


export const Card_MenuItem: React.FC<CardMenuItemProps> = (props: CardMenuItemProps) => {
    const {items, addItem, removeItem} = useItemStore((state) => state,)
    const itemCount = items.filter((item) => item.item_id === props.rawData.item_id && item.restaurant_id === props.rawData.restaurant_id).length

    return (
        <CardContainer>
            <div className="ImageContainer relative w-full aspect-video">
                {props.imageSrc && <Image src={props.imageSrc} alt={props.title} fill style={{objectFit: "cover"}}/>}
            </div>
            <div className="TextContainer w-full flex flex-col gap-2 px-4 py-6 min-h-40">
                <div className="flex flex-row items-baseline justify-between">
                    <p className="card-title">{props.title}</p>
                    <p className="font-semibold text-base">{props.subtitle}</p>
                </div>
                {props.description &&
                    <p className="text-base text-onSurfaceVariant leading-tight">{props.description}</p>}
            </div>
            <div className="flex relative p-4 bottom-2 justify-end">
                <Stepper itemCount={itemCount} removeAction={() => {
                    removeItem(props.rawData)
                }} addAction={() => {
                    addItem(props.rawData)
                }}/>
            </div>
        </CardContainer>
    )
}