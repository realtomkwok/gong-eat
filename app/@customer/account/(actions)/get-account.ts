'use server'

import {
    CustomerData,
    MenuItemData,
    OrderCardData,
    OrderData,
    OrderItemData,
    RestaurantData
} from "@/app/api/definitions";
import getServerData from "@/app/api/get-server-data";

export async function getCustomer(customerId: CustomerData["customer_id"]) {
    const customerData: Promise<CustomerData> = await getServerData(`/customer?customer_id=${customerId}`)

    return customerData
}

export async function getOrders(customerId: CustomerData["customer_id"]) {
    const ordersData: Promise<OrderCardData[]> = getServerData(`/orders/customer/${customerId}`)

    return ordersData
}

export async function getAnOrder(orderId: OrderCardData["order_id"]) {
    const orderData: Promise<OrderData> = getServerData(`/orders?order_id=${orderId}`)

    return orderData
}

export async function getRestaurants() {
    const restaurantsData: Promise<RestaurantData[]> = getServerData('/restaurant/all')

    return restaurantsData
}

export async function getRestaurantMenu(restaurantId: RestaurantData["restaurant_id"]) {
    const restaurantMenu: Promise<MenuItemData[]> = getServerData(`/menu?restaurant_id=${restaurantId}`)

    return restaurantMenu
}

export async function getOrderItems(orderId: OrderCardData["order_id"]) {
    const orderItems: Promise<OrderItemData[]> = getServerData(`/api/orderitems/${orderId}`)

    return orderItems
}