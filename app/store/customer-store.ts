import {create} from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import { CustomerData } from "@/app/api/definitions";

export interface CustomerState {
    customerId: CustomerData["customer_id"]
    customerData: CustomerData
    setCustomerId: (id: CustomerData["customer_id"]) => void
    setCustomerData: (data: CustomerData) => void
}

export const useCustomerStore = create(persist((set) => ({
    customerId: 1,
    customerData: {
        customer_address: "",
        customer_id: 0,
        customer_name: "",
        customer_phone: "",
        vip_expire: null,
        vip_status: "inactive"

    },
    setCustomerId: (id: CustomerData["customer_id"]) => set({ customerId: id }),
    // setCustomerData: (data) => set({ customerData: data })
    setCustomerData: () => set((state: CustomerState) => ({customerData: state.customerData}))
}), {
    name: 'current-customer',
    storage: createJSONStorage(() => sessionStorage)
}))