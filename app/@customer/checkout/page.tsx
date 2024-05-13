'use client'

import React from "react";
import {CustomerOrderData, MenuItemData, CartItemData} from "@/app/api/definitions";
import Link from "next/link";
import {Button} from "@/app/components/button";
import {useItemStore} from "@/app/providers/item-store-provider";
import { submitOrder } from "@/app/api/post-order";

export default function CheckoutPage() {
    // TODO: Fetch customer data from state
    const customerData = {
        "customer_id": 1,
        "customer_name": "Alice Smith",
        "vip_status": "active",
        "vip_expire": "2024-12-31",
        "customer_address": "789 Hill Rd",
        "customer_phone": "555-7890"
    }

    // Aggregate items in cart
    // TODO: Separate different restaurant items into different orders
    const {items} = useItemStore((state) => state)
    const aggregateItems = (items: MenuItemData[]): CartItemData[] => {
        const map = new Map<number, CartItemData>

        items.forEach((item) => {
            const existingEntry = map.get(item.item_id)
            if (existingEntry) {
                existingEntry.item_subtotal += item.item_price
                existingEntry.item_counts++
            } else {
                map.set(item.item_id, {
                    ...item,
                    item_subtotal: item.item_price,
                    item_counts: 1
                })
            }
        })

        return Array.from(map.values())
    }

    if (customerData && items) {
        const cartItemData = aggregateItems(items)

        const itemCountsInOrder = cartItemData.reduce((acc, item) => acc + item.item_counts, 0)
        const orderSubtotal = cartItemData.reduce((acc, item) => acc + item.item_subtotal, 0)
        const orderServiceFee = 5
        const finalServiceFee = customerData.vip_status === "active" ? 0 : orderServiceFee
        const orderTotal = orderSubtotal + finalServiceFee

        const customerOrderData: CustomerOrderData = {
            order_id: Math.floor(Math.random() * 1000000),
            restaurant_id: cartItemData[0].restaurant_id,
            customer_id: customerData.customer_id,
            order_status: "confirmed",
            order_subtotal: orderSubtotal,
            order_service_fee: finalServiceFee,
            created_time: new Date(),
            comment: ""
        }

        // Handle order submission
        const handleCheckout = () => {
            submitOrder(customerOrderData).then(() => {
                console.log("Order is submitted.")
            }).catch((error) => {
                console.error("Failed to submit order:", error)
            })
        }

        return (
            <div className="w-full text-onSurface">
                <div className="container mx-auto p-8">
                    <Link href={"/"}>
                        <Button icon={{iconName: "arrow_back"}} label="Back to Menu" className="w-fit"/>
                    </Link>
                    <h1 className="font-semibold text-6xl tracking-tighter py-12">Checkout</h1>
                    <div className="grid grid-cols-5 gap-4">
                        <section className="col-span-3 flex flex-col gap-2">
                            <div className="bg-surface p-6 rounded-3xl text-onSurface">
                                <h2 className="font-semibold text-2xl mb-4 tracking-tight">Delivery Details</h2>
                                <div className="flex flex-col justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">{customerData.customer_name}</h3>
                                        <p className="font-normal text-base">{customerData.customer_address}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-surface p-6 rounded-3xl text-onSurface">
                                <h2 className="font-semibold text-2xl mb-4 tracking-tight">Payment Method</h2>

                            </div>
                            <div className="bg-surface p-6 rounded-3xl text-onSurface">
                                <div className="flex flex-row justify-between mb-4">
                                    <h2 className="font-semibold text-2xl tracking-tight">Order Summary</h2>
                                    <div
                                        className="font-normal text-xl">{itemCountsInOrder} {itemCountsInOrder === 1 ? 'item' : 'items'}
                                    </div>
                                </div>
                                <ul className="flex flex-col py-2">
                                    {cartItemData.map((item, key) => {
                                        return (
                                            <li className="flex flex-row gap-4 py-2 min-h-14" key={key}>
                                                <div
                                                    className="flex w-6 h-6 justify-center rounded-full bg-tertiary text-onTertiary">
                                                    <span className="-translate-y-[1px]">{item.item_counts}</span>
                                                </div>
                                                <div
                                                    className="flex flex-row justify-between w-full border-b border-b-outlineVariant">
                                                    <h3 className="font-semibold text-base">{item.item_name}</h3>
                                                    <p className="font-normal text-base">${item.item_subtotal.toFixed(2)}</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="bg-surface p-6 rounded-3xl text-onSurface">
                                <h2 className="font-semibold text-2xl mb-4 tracking-tight">Special Instructions</h2>
                                <textarea className="w-full h-32 bg-surfaceContainer text-onSurfaceContainer p-4 rounded-2xl"
                                          placeholder="Add a note to your order (optional)"
                                />
                            </div>
                        </section>
                        <section className="col-span-2 flex flex-col gap-6 sticky">
                            <div className="bg-surfaceBright text-onSurface p-6 rounded-3xl flex flex-col gap-4">
                                <h2 className="font-semibold text-2xl mb-4 tracking-tight">Order Summary</h2>
                                <ul className="flex flex-col gap-2">
                                    <li className="flex flex-row justify-between text-base">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">${orderSubtotal.toFixed(2)}</span>
                                    </li>
                                    <li className="flex flex-row justify-between text-base">
                                        <span>Service Fee</span>
                                        <div className="flex flex-col gap-1 items-end">
                                            {customerData.vip_status === "active"
                                                ? (<>
                                                        <p>
                                                            <span
                                                                className="font-normal line-through text-onSurfaceVariant mr-1">${orderServiceFee.toFixed(2)}</span>
                                                            <span
                                                                className="font-semibold">${finalServiceFee.toFixed(2)}</span>
                                                        </p>
                                                        <p className="font-normal text-sm text-primary">{customerData.vip_status === "active" ? "You're saving with Membership!" : null}</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>
                                                            <span
                                                                className="font-semibold">${finalServiceFee.toFixed(2)}</span>
                                                        </p>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </li>
                                </ul>
                                <div className="border-b border-b-outlineVariant"/>
                                <div className="flex flex-row justify-between font-semibold text-xl tracking-tight">
                                    <h2>Total</h2>
                                    <span>${orderTotal.toFixed(2)}</span>
                                </div>
                                <Button onClick={() => handleCheckout()}
                                        icon={{iconName: "arrow_forward"}}
                                        label="Place Order"
                                        btnStyle={{
                                    color: "bg-primary",
                                    stateColor: "bg-stateOnPrimary",
                                    textColor: "text-onPrimary"
                                }}/>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <h1>Order not found</h1>
        )
    }
}