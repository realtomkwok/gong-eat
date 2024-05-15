import React from 'react';
import {CustomerData, OrderCardData, RestaurantData} from "@/app/api/definitions";
import getServerData from "@/app/api/get-server-data";
import {CustomerProfile} from "@/app/@customer/account/(components)/customer-profile";
import {OrderHistory} from "@/app/@customer/account/(components)/order-history";

export default async function AccountPage() {
    const customerId = 1

    const customerData: Promise<CustomerData> = getServerData(`/customer?customer_id=${customerId}`)
    const ordersData: Promise<OrderCardData[]> = getServerData(`/orders/customer/${customerId}`)
    const restaurantsData: Promise<RestaurantData[]> = getServerData('/restaurant/all')

    // Wait for all data to be fetched
    const [customer, orders, restaurants] = await Promise.all([customerData, ordersData, restaurantsData])

    console.log(orders)

    return (
        <div>
            <h1 className="font-semibold text-6xl tracking-tighter py-12">Bon appétit, {customer.customer_name.split(" ")[0]}!</h1>
            <div className="grid grid-cols-3 gap-6">
                <section className="col-span-1 bg-surface p-6 rounded-3xl">
                    <CustomerProfile initialData={customer}/>
                </section>
                <section className="col-span-2 bg-surface p-6 rounded-3xl">
                    <OrderHistory orderData={orders} restaurantData={restaurants} />
                </section>
            </div>
        </div>
)
}