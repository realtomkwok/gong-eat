import React from "react";
import {MenuItemData, OrderData, OrderItemData} from "@/app/api/definitions";
import getID from "@/app/api/get-id";
import getServerData from "@/app/api/get-server-data";
import {Button} from "@/app/components/button";
import Link from "next/link";
import {MaterialIcon} from "@/app/components/material-icon";

export default async function OrderDetailsPage({params}: { params: { slug: string } }) {
    const orderID = Number(getID(params.slug))
    const orderData: OrderData | undefined = await getServerData('/orders?order_id=' + orderID)
    const orderItems: OrderItemData[] = await getServerData('/api/orderitems/' + orderID)
    const restaurantMenu: MenuItemData[] = await getServerData('/menu?restaurant_id=' + orderData?.restaurant_id)

    orderItems.forEach(item => {
        item.item_name = restaurantMenu.find(menuItem => menuItem.item_id === item.item_id)?.item_name
        item.item_price = restaurantMenu.find(menuItem => menuItem.item_id === item.item_id)?.item_price
    })

    const statusColor = () => {
        switch (orderData?.order_status) {
            case "confirmed":
                return {
                    bg: "bg-primary",
                    text: "text-onPrimary"
                }
            case "delivered":
                return {
                    bg: "bg-tertiary",
                    text: "text-onTertiary"
                }
            case "accepted":
                return {
                    bg: "bg-primary",
                    text: "text-onPrimary"
                }
            case "rejected":
                return {
                    bg: "bg-error",
                    text: "text-onPrimary"
                }
        }
    }

    const createAt = new Date(orderData?.create_time!).toLocaleString("en-AU", {
        timeZone: "Australia/Sydney",
        dateStyle: "medium",
        timeStyle: "short"
    })

    return (
        <div className="">
            <div className="flex flex-row justify-between">
                <Link href={"/account"}>
                    <Button icon={{iconName: "arrow_back"}} label={"Back to Orders"}/>
                </Link>
            </div>
            <div className="flex flex-row gap-6 mt-8 items-center">
                <h1 className="font-semibold text-4xl tracking-tight">Order #{orderData?.order_id}</h1>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
                <section className="col-span-1 bg-surface p-6 rounded-3xl">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-semibold text-2xl tracking-tight">Order Status</h2>
                            <div
                                className={`inline-flex flex-grow-0 rounded-full px-4 py-2 w-fit ${statusColor()?.bg}`}>
                                <p className={`text-sm font-semibold uppercase ${statusColor()?.text}`}>{orderData?.order_status}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {/* TODO: Delivery information */}
                            <h2 className="font-semibold text-2xl tracking-tight">Delivered by</h2>
                            <p className="text-base">{orderData?.delivery_person_id}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="font-semibold text-2xl tracking-tight">Order Date</h2>
                            <p className="text-base">{createAt}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="border-b border-outlineVariant-50"/>
                            <Link href={""}>
                                <div className="inline-flex flex-row justify-between items-center gap-4 text-primary">
                                    <MaterialIcon iconName={"help"}/>
                                    <h4 className="font-semibold text-base ">Need help?</h4>
                                </div>
                            </Link>
                            <div className="border-b border-outlineVariant-50"/>
                            <Link href={""}>
                                <div className="inline-flex flex-row justify-between items-center gap-4 text-red-700">
                                    <MaterialIcon iconName={"Cancel"}/>
                                    <h4 className="font-semibold text-base ">Cancel order</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="col-span-2 bg-surface p-6 rounded-3xl">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-semibold text-2xl tracking-tight">Order Items</h2>
                        <div className="flex flex-col gap-2">
                            <ul className="flex flex-col mt-4">
                                {orderItems.map((item, key) => {
                                        const itemSubtotal = item.item_price! * item.quantity
                                        return (
                                            <li className="flex flex-row gap-4 py-2 min-h-14" key={key}>
                                                <div
                                                    className="flex w-6 h-6 justify-center rounded-full bg-tertiary text-onTertiary">
                                                    <span className="-translate-y-[1px]">{item.quantity}</span>
                                                </div>
                                                <div
                                                    className="flex flex-row justify-between w-full border-b border-b-outlineVariant">
                                                    <h3 className="font-semibold text-base">{item.item_name}</h3>
                                                    <p className="font-normal text-base">${itemSubtotal.toFixed(2)}</p>
                                                </div>
                                            </li>
                                        )
                                    }
                                )}
                            </ul>
                            <div className="flex justify-between gap-4">
                                <p className="font-semibold text-xl">Subtotal</p>
                                <p className="font-semibold text-xl">${orderData?.order_subtotal}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}