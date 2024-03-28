'use client'

import {useItemStore} from "@/app/providers/item-store-provider";
import {Button} from "@/app/components/button";
import React, {useState} from "react";
import {Popover, PopoverArrow, PopoverHeading} from "@/app/components/popover";


export default function ShoppingBagBtn() {
    const shoppingBagCount = useItemStore((state) => state).totalCount
    const [open, setOpen] = useState(false)

    return (
        <>

        </>
    )
}