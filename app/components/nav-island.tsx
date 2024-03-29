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
import getItems from "@/app/lib/get-items";

export default function NavIsland() {
    const {totalCount, items} = useItemStore((state) => state)
    const [bagIsOpen, setBagOpen] = useState(false)

    const totalPrice = getItems(items).totalPrice
    const groupedItems = getItems(items).groupedItems

    const ShoppingBag: React.FC<MotionProps> = ({...rest}) => {
        const {addItem, removeItem} = useItemStore((state) => state,)

        return (
            <motion.div className="flex flex-col w-[640px] rounded-4xl gap-4" {...rest}>
                <div className="flex flex-row justify-between w-full items-center">
                    <Button icon={{iconName: "close"}} className="w-fit justify-self-start"
                            onClick={() => setBagOpen(!bagIsOpen)}/>
                    <Link href="/checkout" onClick={() => setBagOpen(false)}>
                        <Button icon={{iconName: "arrow_forward"}}
                                btnStyle={{color: "bg-primary", textColor: "text-onPrimary", stateColor: "bg-statePrimary"}}
                                label="Checkout" className="w-fit justify-self-end" disabled={totalCount === 0} />
                    </Link>

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
                        {groupedItems.map((item, key) => {
                            const itemSubtotal = item.itemData.item_price * item.count

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

    const Initial: React.FC<MotionProps> = ({...rest}) => {
        return (
            <motion.nav className="flex flex-row rounded-full gap-4" {...rest}>
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
            <motion.div className="navIsland-base rounded-4xl"
                        // initial={{translateX: "-50%"}}
                        // whileHover={{scale: 1.02}}
            >
                {bagIsOpen
                    ? <ShoppingBag />
                    : <Initial initial={{width: 640, opacity: 0}} animate={{width: "max-content", opacity: 1}} exit={{width: 640, opacity: 1}}/>}
            </motion.div>
        </AnimatePresence>
    )
}