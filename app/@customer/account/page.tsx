import React from 'react';
import {CustomerData} from "@/app/api/definitions";
import getServerData from "@/app/api/get-server-data";
import {CustomerProfile} from "@/app/@customer/account/(ui)/customerProfile";

export default async function AccountPage() {
    const customerData: CustomerData = await getServerData('/customer?customer_id=2')

    return (
        <div className="container mx-auto">
            <h1 className="font-semibold text-6xl tracking-tighter py-12">Dashboard</h1>
            <div className="grid grid-cols-3 gap-6">
                <section className="col-span-1 bg-surface p-6 rounded-3xl">
                    <h2 className="font-semibold text-2xl tracking-tight col-span-4">{customerData.customer_name}</h2>
                </section>
                <CustomerProfile initialData={customerData} />
            </div>
        </div>
    )
}