import React from 'react';
import {CustomerData, OrderCardData, RestaurantData} from "@/app/api/definitions";
import getServerData from "@/app/api/get-server-data";
import {CustomerProfile} from "@/app/@customer/account/(components)/customer-profile";
import {OrderHistory} from "@/app/@customer/account/(components)/order-history";

export default async function AccountPage() {
    const customerData: CustomerData = await getServerData('/customer?customer_id=1')
    const orderData: OrderCardData[] = await getServerData('/orders/customer/1')
    const restaurantData: RestaurantData[] = await getServerData('/restaurant/all')

    return (
        <div>
            <h1 className="font-semibold text-6xl tracking-tighter py-12">Bon appétit, {customerData.customer_name.split(" ")[0]}!</h1>
            <div className="grid grid-cols-3 gap-6">
                <section className="col-span-1 bg-surface p-6 rounded-3xl">
                    <CustomerProfile initialData={customerData}/>
                </section>
                <section className="col-span-2 bg-surface p-6 rounded-3xl">
                    <OrderHistory orderData={orderData} restaurantData={restaurantData} />
                </section>
            </div>
        </div>
)
}