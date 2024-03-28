'use client'

import Link from "next/link";
import {Button} from "@/app/components/button";
import Search from "@/app/components/search";
import React, {useState} from "react";
import {useItemStore} from "@/app/providers/item-store-provider";
import Image from "next/image";
import {MenuItemData} from "@/app/lib/data-type";
import Stepper from "@/app/components/stepper";
import {motion, AnimatePresence, MotionProps} from "framer-motion";

export default function NavIsland() {
    const {totalCount, items} = useItemStore((state) => state)
    const [bagIsOpen, setBagOpen] = useState(false)

    let totalPrice = 0
    items.forEach((item) => totalPrice += item.item_price)

    let uniqueItemsWithCount: { [key: string]: { itemData: MenuItemData, count: number } } = {}

    items.forEach((item) => {
        if (uniqueItemsWithCount[item.item_id]) {
            uniqueItemsWithCount[item.item_id].count += 1;
        } else {
            uniqueItemsWithCount[item.item_id] = {itemData: item, count: 1};
        }
    })

    const groupedItems = Object.values(uniqueItemsWithCount)

    const ShoppingBag: React.FC<MotionProps> = () => {
        const {addItem, removeItem} = useItemStore((state) => state,)

        return (
            <motion.div className="navIsland-base flex-col w-[640px] rounded-4xl">
                <div className="grid grid-cols-2 w-full items-center">
                    <Button icon={{iconName: "close"}} className="w-fit justify-self-start"
                            onClick={() => setBagOpen(!bagIsOpen)}/>
                    <Button icon={{iconName: "arrow_forward"}}
                            btnStyle={{color: "bg-primary", textColor: "text-onPrimary", stateColor: "bg-statePrimary"}}
                            label="Checkout" className="w-fit justify-self-end" disabled={totalCount === 0}/>
                </div>
                <div className="w-full">
                    <div
                        className="grid grid-cols-2 justify-between text-xl font-semibold pb-4 border-b border-b-outlineVariant px-2">
                        <h1 className="justify-self-start">
                            <span>Bag </span>
                            <span className="font-normal">({totalCount} {totalCount === 1 ? 'item' : 'items'})</span>
                        </h1>
                        <div className="justify-self-end">
                            <span>Subtotal: </span>
                            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-2 py-2">
                        {groupedItems.map((items, key) => {
                            const item = items
                            // const itemCount = items.length
                            const itemSubtotal = items.itemData.item_price * item.count

                            return (
                                <li className="group rounded-2xl bg-surface overflow-clip" key={key}>
                                    <div className="StateLayer hover:bg-surfaceVariant transition-all">
                                        <div className="flex flex-row p-4 w-full">
                                            <Image className="aspect-square object-cover rounded-lg mr-4"
                                                   src={item.itemData.item_image} alt={item.itemData.item_name}
                                                   width={48}
                                                   height={48}/>
                                            <div
                                                className="grid grid-cols-3 justify-between w-full text-base font-semibold items-center">
                                                <p className="col-span-1">{item.itemData.item_name}</p>
                                                <Stepper itemCount={item.count}
                                                         removeAction={() => removeItem(item.itemData)}
                                                         addAction={() => addItem(item.itemData)}/>
                                                <p className="col-span-1 justify-self-end">${itemSubtotal.toFixed(2)}</p>

                                            </div>
                                        </div>
                                    </div>
                                </li>

                            )
                        })}
                    </ul>
                </div>
            </motion.div>
        )
    }

    const Initial: React.FC<MotionProps> = () => {
        return (
            <motion.nav className="navIsland-base flex-row rounded-full ">
                <Button icon={{iconName: "account_circle"}}/>
                <div className="flex px-2 pb-1 content-center items-center text-2xl font-bold tracking-widest">
                    <Link href="/">
                        <span>GONG EATS</span>
                    </Link>
                </div>
                {/*<Button icon={{iconName: "location_on"}} label={deliveryAddress}/>*/}
                <Search placeholder={"Cuisine, Restaurants, etc..."}/> {/* TODO: Add search functionality */}
                <Button icon={{iconName: "shopping_basket"}} label={totalCount}
                        onClick={() => setBagOpen(!bagIsOpen)}/>
            </motion.nav>
        )
    }


    return (
        <AnimatePresence>
            {bagIsOpen
                ? <ShoppingBag
                />
                : <Initial
                />}
        </AnimatePresence>
    )
}