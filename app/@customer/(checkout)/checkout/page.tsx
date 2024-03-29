import React from "react";
import {MenuItemData} from "@/app/lib/data-type";
import getData from "@/app/lib/get-data";

export interface CheckoutPageProps {
    totalCount: number
    totalPrice: number
    groupItems: {
        itemData: MenuItemData
        count: number
    }[]
}

export default async function CheckoutPage(props: CheckoutPageProps) {
    // const restaurants = await getData("/api/restaurants.json")

    return (
        <div className="bg-surfaceContainer w-full text-onSurface">
            <div className="container mx-auto py-16">
                <h1 className="font-semibold text-6xl tracking-tighter pb-16">Checkout</h1>
                <div className="grid grid-cols-5 gap-6">
                    <section className="col-span-3">
                        <div className="bg-surface p-6 rounded-3xl">
                            <div className="flex flex-row justify-between mb-4">
                                <h2 className="font-semibold text-2xl">Order Summary</h2>
                                <div
                                    className="font-normal text-xl">{props.totalCount} {props.totalCount === 1 ? 'item' : 'items'}
                                </div>
                            </div>
                            <ul className="flex flex-col gap-4 py-2">
                            {props.groupItems.map((item, key) => {
                                    const itemData = item.itemData
                                    const itemSubtotal = item.itemData.item_price * item.count

                                    return (
                                        <li className="flex flex-row gap-4 py-2 min-h-16" key={key}>
                                            <div
                                                className="flex w-6 h-6 justify-center rounded-full bg-tertiary text-onTertiary">
                                                <span className="-translate-y-[1px]">{item.count}</span>
                                            </div>
                                            <div className="flex flex-row justify-between gap-4 w-full border-b border-b-outlineVariant">
                                                <h3 className="font-semibold text-base">{itemData.item_name}</h3>
                                                <p className="font-normal text-base">${itemSubtotal}</p>
                                            </div>

                                        </li>
                                    )
                            })}
                            </ul>
                        </div>
                    </section>
                    <section className="col-span-2 flex flex-col gap-6 sticky">
                        <div className="bg-surface p-6 rounded-3xl">
                            Order Summary
                        </div>
                    </section>
                </div>
            </div>

        </div>
    )
}