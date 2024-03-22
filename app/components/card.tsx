import Image from "next/image";
import React from "react";
import {MaterialIcon} from "@/app/components/material-icon";

interface CardProps {
    props: {
        title: string
        subtitle: string
        description?: string
        rating?: number
        imageSrc: string
    }
}

function Rating(props: { rating: number }) {
    return <div className="flex flex-row items-center gap-0.5">
        <MaterialIcon className="" iconName={"star"} iconStyle={"rounded"} weight={600} grade={-25} opticalSize={20}
                      fontSize={16}/>
        <span className="card-subtitle -translate-y-[1px]">{props.rating}</span>
    </div>;
}

export const Card_Restaurant: React.FC<CardProps> = ({props}) => {
    return (
        <div className="CardContainer bg-surface border border-outline rounded-2xl overflow-hidden">
            <div className="StateLayer w-full h-full hover:bg-surfaceVariant transition-all">
                <div className="Card flex flex-col items-start self-stretch">
                    <div className="ImageContainer relative w-full aspect-square">
                        <Image src={props.imageSrc} alt={props.title} fill style={{objectFit: "cover"}}/>
                    </div>
                    <div className="TextContainer w-full flex flex-col gap-2 px-4 py-6 ">
                        <div className="flex flex-row items-baseline justify-between">
                            <p className="card-title">{props.title}</p>
                            {props.rating && <Rating rating={props.rating} />}
                        </div>
                        <p className="card-subtitle uppercase">{props.subtitle}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Card_MenuItem: React.FC<CardProps> = ({props}) => {
    return (
        <div className="CardContainer bg-surface border border-outline rounded-2xl overflow-hidden">
            <div className="StateLayer w-full h-full hover:bg-surfaceVariant transition-all">
                <div className="Card flex flex-col items-start self-stretch">
                    <div className="ImageContainer relative w-full aspect-video">
                        <Image src={props.imageSrc} alt={props.title} fill style={{objectFit: "cover"}}/>
                    </div>
                    <div className="TextContainer w-full flex flex-col gap-2 px-4 py-6 ">
                        <div className="flex flex-row items-center justify-between">
                            <p className="card-title">{props.title}</p>
                            <p className="font-semibold text-base">{props.subtitle}</p>
                        </div>
                        {props.description && <p className="text-base text-onSurfaceVariant leading-tight">{props.description}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}