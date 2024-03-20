import {MaterialIcon, IconProps} from "@/app/components/material-icon";
import React from "react";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
    icon: IconProps
    label?: string | number
}

export const Button: React.FC<ButtonProps> = props => {
    const {icon, label, ...rest} = props

    return (
        <button type="button" {...rest}>
            <div className="BtnContainer bg-secondContainer text-onSecondContainer rounded-full overflow-hidden">
                <div className="StateLayer hover:bg-stateOnSecondContainer ">
                    <div className="Button flex justify-center items-center py-2 px-4 gap-2 self-stretch">
                        <MaterialIcon iconName={icon.iconName} iconStyle={icon.iconStyle} fill={icon.fill}
                                      weight={icon.weight} grade={icon.grade} opticalSize={icon.opticalSize}/>
                        {label ? <span className="text-base font-semibold pb-0.5">{label}</span> : null}
                    </div>
                </div>
            </div>
        </button>
    )
}