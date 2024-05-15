import React from "react";
import {OrderCardData, RestaurantData} from "@/app/api/definitions";
import {Card_Order} from "@/app/components/card";
import Link from "next/link.js";
import {Button} from "@/app/components/button";

export const OrderHistory = ({orderData, restaurantData}: {orderData: OrderCardData[], restaurantData: RestaurantData[]}) => {
    // Add restaurant name to orders data
    orderData.forEach(order => {
        const restaurant = restaurantData.find(restaurant => restaurant.restaurant_id === order.restaurant_id)
        order.restaurant_name = restaurant?.restaurant_name
        order.restaurant_hero_image = restaurant?.restaurant_hero_image
    })

    if (orderData !== undefined && orderData.length > 0) {
        return (
            <>
                <h2 className="font-semibold text-2xl tracking-tight">Order History</h2>
                <div className="flex overflow-x-auto mt-6">
                    {orderData.map((order, key) => (
                        <Link href={`/account/orders/order_id=${order.order_id}`} key={key}>
                            <div className="flex-shrink-0 w-80 mr-4">
                                <Card_Order
                                            title={order.restaurant_name!}
                                            imageSrc={order.restaurant_hero_image!}
                                            status={order.order_status}
                                            description={order.order_subtotal.toString()}
                                            createdAt={order.create_time!}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    } else {
        return (
            <>
                <h2 className="font-semibold text-2xl tracking-tight">Order History</h2>
                <div className="flex flex-col justify-center items-center h-64 gap-4">
                    <p className="text-[96px] font-normal text-onSurface">(^_^)b</p>
                    <p className="card-title font-semibold text-onSurface">No orders yet!</p>
                    <Link href={"/"}>
                        <Button label={"Order Now"} icon={{iconName: "arrow_forward"}} />
                    </Link>
                </div>
            </>
        )
    }
}
