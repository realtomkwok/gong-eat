import React from 'react';
import {CustomerData} from "@/app/api/definitions";
import getServerData from "@/app/api/get-server-data";
import {CustomerProfile} from "@/app/@customer/account/(ui)/customerProfile";

export default async function AccountPage() {
    const customerData: CustomerData = await getServerData('/customer?customer_id=1')

    return (
        <div className="container mx-auto">
            <h1 className="font-semibold text-6xl tracking-tighter py-12">My Account</h1>
            <div className="grid grid-cols-3 gap-6">
                <section className="col-span-1 bg-surface p-6 rounded-3xl">
                    <CustomerProfile initialData={customerData}/>
                </section>
            </div>
        </div>
)
}