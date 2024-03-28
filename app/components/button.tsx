'use client'

import {MaterialIcon, IconProps} from "@/app/components/material-icon";
import React from "react";
import {motion} from "framer-motion";
import {emphasizedEasing_Medium} from "@/app/lib/motion-config";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
    icon: IconProps
    label?: string | number
    btnStyle?: {
        color?: string
        stateColor?: string
        textColor?: string
    }
    disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
                                                  icon,
                                                  label,
                                                  btnStyle = {
                                                      color: 'bg-secondaryContainer',
                                                      stateColor: 'hover:bg-stateOnSecondaryContainer',
                                                      textColor: 'text-onSecondaryContainer',
                                                  },
                                                  disabled = false,
                                                  ...rest
                                              }) => {

    return (
        <button type="button" disabled={disabled} {...rest}>
            <motion.div className={`input-base ${!disabled ? btnStyle.color : "bg-disabledSurface"} ${!disabled ? btnStyle.textColor : "text-onDisabledSurface"}`}
                        whileTap={{scale: 0.95, transition: emphasizedEasing_Medium}}>
                <div className={`StateLayer ${btnStyle.stateColor} transition-all`}>
                    <div className="Button flex justify-center items-center py-2 px-4 gap-2 self-stretch">
                        <MaterialIcon iconName={icon.iconName} iconStyle={icon.iconStyle} fill={icon.fill}
                                      weight={icon.weight} grade={icon.grade} opticalSize={icon.opticalSize}/>
                        {label ? <span className="pb-0.5">{label}</span> : null}
                    </div>
                </div>
            </motion.div>
        </button>
    )
}