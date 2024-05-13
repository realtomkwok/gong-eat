'use client'

import {useEffect} from "react";
import useStore from "@/app/api/useStore";
import { useCustomerStore } from "@/app/store/customer-store";
import { CustomerState} from "@/app/store/customer-store";
import { CustomerData } from "@/app/api/definitions";

export const CustomerProfile = ({ initialData }: {initialData: CustomerData}) => {
    console.log(initialData)
    const customerStore = useStore(useCustomerStore, (state: CustomerState) => state)

    console.log(customerStore)      // TODO: it's undefined
    // TODO: User data does not update
    useEffect(() => {
        customerStore?.setCustomerData(initialData)
    }, [initialData])

    return (
        <div>{customerStore?.customerData.customer_name}</div>
    )
}