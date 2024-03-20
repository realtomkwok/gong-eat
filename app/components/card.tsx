import Image from "next/image";
import React from "react";
import {MaterialIcon} from "@/app/components/material-icon";

interface CardProps {
    props: {
        title: string
        subtitle: string
        additionalInfo?: string
        imageSrc: string
    }
}

export const Card_Restaurant: React.FC<CardProps> = ({props}) => {
    return (
        <div className="CardContainer bg-surface border border-outline rounded-2xl overflow-hidden">
            <div className="StateLayer w-full h-full hover:bg-surfaceVariant">
                <div className="Card flex flex-col items-start self-stretch">
                    <div className="ImageContainer relative w-full aspect-square">
                        <Image src={props.imageSrc} alt={props.title} fill objectFit="cover"/>
                    </div>
                    <div className="TextContainer w-full flex flex-col gap-2 px-4 py-6 ">
                        <div className="flex flex-row items-baseline justify-between">
                            <p className="card-title">{props.title}</p>
                            <div className="flex flex-row items-center gap-0.5">
                                <MaterialIcon className="" iconName={"star"} iconStyle={"rounded"} weight={600} grade={-25} opticalSize={20} fontSize={16} />
                                <span className="card-subtitle">{props.additionalInfo}</span>
                            </div>
                        </div>
                        <p className="card-subtitle uppercase">{props.subtitle}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}