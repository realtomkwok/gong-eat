'use client'

import React from "react";
import {MenuItemData, CartItemData, SubmitOrderData, OrderItemData} from "@/app/api/definitions";
import Link from "next/link";
import {Button} from "@/app/components/button";
import {useItemStore} from "@/app/providers/item-store-provider";
import {submitOrder} from "@/app/api/post-order";
import groupItemsByKey from "@/app/api/group-items";
import useStore from "@/app/api/useStore";
import {CustomerState, useCustomerStore} from "@/app/store/customer-store";

export default function CheckoutPage() {
    const customerData = useStore(useCustomerStore, (state: CustomerState) => state.customerData)
    const {items} = useItemStore((state) => state)
    const [instructions, setInstructions] = React.useState<string>("")

    console.log(customerData)

    // TODO: Separate different restaurant items into different orders
    // console.log(groupItemsByKey(items, 'restaurant_id'))

    // Aggregate items in cart
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



    try {
        const cartItemData = aggregateItems(items)

        const itemCountsInOrder = cartItemData.reduce((acc, item) => acc + item.item_counts, 0)
        const orderSubtotal = cartItemData.reduce((acc, item) => acc + item.item_subtotal, 0)
        const orderServiceFee = 5
        const finalServiceFee = customerData.vip_status === "active" ? 0 : orderServiceFee
        const orderTotal = orderSubtotal + finalServiceFee

        const orderData: SubmitOrderData = {
            restaurant_id: cartItemData[0].restaurant_id,
            customer_id: customerData.customer_id.toString(),
            order_status: "confirmed",
            order_subtotal: orderSubtotal,
            order_service_fee: finalServiceFee,
            comment: instructions
        }

        const itemData: OrderItemData[] = cartItemData.map((item) => (
            {
                order_id: undefined,
                item_id: item.item_id,
                quantity: item.item_counts
            }
        ))

        // Handle orders submission
        const handleOrderSubmit = () => {
            submitOrder(orderData, itemData).then(() => {
                console.log("Order is submitted.")

            }).catch((error) => {
                console.error("Failed to submit orders:", error)
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
                                <textarea
                                    className="w-full h-32 bg-surfaceContainer text-onSurfaceContainer p-4 rounded-2xl"
                                    placeholder="Add a note to your order (optional)"
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
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
                                <Button onClick={() => handleOrderSubmit()}
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
    } catch (error) {
        return (
            <div className="w-full text-onSurface ">
                <div className="container mx-auto p-8">
                    <h1 className="font-semibold text-6xl tracking-tighter py-12">Checkout</h1>
                    <div className="bg-surface p-6 rounded-3xl text-onSurface">
                        <h2 className="font-semibold text-2xl mb-4 tracking-tight">Oops... You haven't signed in!</h2>
                        <div className="flex flex-col gap-4">
                            <p className="font-normal text-base">Please sign in to continue to checkout.</p>
                            <div className="inline-flex">
                                <Link href={"/account"}>
                                    <Button icon={{iconName: "arrow_forward"}} label="Sign In" className="w-fit"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}