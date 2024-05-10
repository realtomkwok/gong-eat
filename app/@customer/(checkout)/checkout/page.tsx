import React from "react";
import {MenuItemData, OrderData, RestaurantData} from "@/app/api/data-type";
import getData from "@/app/api/get-data";
import Link from "next/link";
import {Button} from "@/app/components/button";

export default async function CheckoutPage() {
    // *TODO* Retrieve orders data from api
    const orderData: OrderData | undefined = await getData(`/api/orders/order_id=1.json`)
    const customerData = {
        "customer_id": 1,
        "customer_name": "Alice Smith",
        "vip_status": "active",
        "vip_expire": "2024-12-31",
        "customer_address": "789 Hill Rd",
        "customer_phone": "555-7890"
    }

    if (customerData && orderData) {
        const itemsOfTheRestaurant: MenuItemData[] = await getData(`/api/menu/restaurant_id=${orderData.restaurant_id}.json`)
        const orderedItems: { itemData: MenuItemData, count: number }[] = orderData.order_items.map((item) => {
            return {
                itemData: itemsOfTheRestaurant.find((menuItem) => menuItem.item_id === item.item_id) as MenuItemData,
                count: item.item_quantity
            }
        })
        const itemsQuantity = orderedItems.reduce((acc, item) => acc + item.count, 0)
        const orderServiceFee = customerData.vip_status === "active" ? 0.00 : orderData.order_service_fee
        const orderTotal = orderData.order_subtotal + orderServiceFee

        return (
            <div className="w-full text-onSurface">
                <div className="container mx-auto">
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
                                        className="font-normal text-xl">{itemsQuantity} {itemsQuantity === 1 ? 'item' : 'items'}
                                    </div>
                                </div>
                                <ul className="flex flex-col py-2">
                                    {orderedItems.map((item, key) => {
                                        return (
                                            <li className="flex flex-row gap-4 py-2 min-h-14" key={key}>
                                                <div
                                                    className="flex w-6 h-6 justify-center rounded-full bg-tertiary text-onTertiary">
                                                    <span className="-translate-y-[1px]">{item.count}</span>
                                                </div>
                                                <div
                                                    className="flex flex-row justify-between w-full border-b border-b-outlineVariant">
                                                    <h3 className="font-semibold text-base">{item.itemData.item_name}</h3>
                                                    <p className="font-normal text-base">{item.itemData.item_price * item.count}</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </section>
                        <section className="col-span-2 flex flex-col gap-6 sticky">
                            <div className="bg-surfaceBright text-onSurface p-6 rounded-3xl flex flex-col gap-4">
                                <h2 className="font-semibold text-2xl mb-4 tracking-tight">Order Summary</h2>
                                <ul className="flex flex-col gap-2">
                                    <li className="flex flex-row justify-between text-base">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">{orderData.order_subtotal}</span>
                                    </li>
                                    <li className="flex flex-row justify-between text-base">
                                        <span>Service Fee</span>
                                        <div className="flex flex-col gap-1 items-end">
                                            <p>
                                                <span
                                                    className="font-normal line-through text-onSurfaceVariant mr-1">{orderData.order_service_fee.toFixed(2)}</span>
                                                <span
                                                    className="font-semibold">{orderServiceFee.toFixed(2)}</span>
                                            </p>
                                            <p className="font-normal text-sm text-primary">{customerData.vip_status === "active" ? "You're saving with Membership!" : null}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="border-b border-b-outlineVariant"/>
                                <div className="flex flex-row justify-between font-semibold text-xl tracking-tight">
                                    <h2>Total</h2>
                                    <span>${orderTotal.toFixed(2)}</span>
                                </div>
                                <Button icon={{iconName: "arrow_forward"}} label="Place Order" btnStyle={{
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