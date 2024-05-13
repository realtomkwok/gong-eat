import {create} from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import { CustomerData } from "@/app/api/definitions";

export interface CustomerState {
    customerData: CustomerData
    setCustomerData: (data: CustomerData) => void
}

export const useCustomerStore = create(persist((set) => ({
    customerData: {} as CustomerData,
    setCustomerData: (data: CustomerData) => set({customerData: data})
}), {
    name: 'customer-store',
    storage: createJSONStorage(() => sessionStorage)
}))