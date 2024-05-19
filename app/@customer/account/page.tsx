'use client'

import React, {useEffect} from 'react';
import {CustomerData, OrderCardData, RestaurantData} from "@/app/api/definitions";
import {CustomerProfile} from "@/app/@customer/account/(components)/customer-profile";
import {OrderHistory} from "@/app/@customer/account/(components)/order-history";
import {getCustomer, getOrders, getRestaurants} from "@/app/@customer/account/(actions)/get-account"

export default function AccountPage() {
    // Automatically update the view when the status of an order is changed

    // const { customerId, customerData, setCustomerId, setCustomerData } = useStore(useCustomerStore, (state: CustomerState) => state)
    const [customer, setCustomer] = React.useState<CustomerData>({
        customer_address: "",
        customer_id: 0,
        customer_name: "",
        customer_phone: "",
        vip_expire: null,
        vip_status: "inactive"
    })
    const [orders, setOrders] = React.useState<OrderCardData[]>([])
    const [restaurants, setRestaurants] = React.useState<RestaurantData[]>([])

    useEffect(() => {
        // TODO: Replace with actual customer ID
        let customerId = 2

        const fetchCustomer = async () => {
            const customerData: CustomerData = await getCustomer(customerId)
            // setCustomerData(customerData)
            setCustomer(customerData)
            // useCustomerStore.getState().setCustomerData(customerData)
        }

        const fetchOrders = async () => {
            const ordersData: OrderCardData[] = await getOrders(customerId)
            setOrders(ordersData)
        }

        const fetchRestaurants = async () => {
            const restaurantsData: RestaurantData[] = await getRestaurants()
            setRestaurants(restaurantsData)
        }

        // Fetch data on initial load
        // Usage of `void`
        // https://stackoverflow.com/questions/41278900/intellij-idea-warning-promise-returned-is-ignored-with-aysnc-await
        void fetchCustomer()
        void fetchOrders()
        void fetchRestaurants()

        const intervalID = setInterval(() => {
            void fetchCustomer()
            void fetchOrders()
            void fetchRestaurants()
        }, 5000)

        return () => clearInterval(intervalID)
    }, [])

    return (
        <div>
            <h1 className="font-semibold text-6xl tracking-tighter py-12">Bon
                appétit, {customer.customer_name.split(" ")[0]}!</h1>
            <div className="grid grid-cols-3 gap-6">
                <section className="col-span-1 bg-surface p-6 rounded-3xl">
                    <CustomerProfile initialData={customer}/>
                </section>
                <section className="col-span-2 bg-surface p-6 rounded-3xl">
                    <OrderHistory orderData={orders} restaurantData={restaurants}/>
                </section>
            </div>
        </div>
    )
}