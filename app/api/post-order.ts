'use server'

import {CustomerOrderData} from "@/app/api/definitions";

// TODO: Fix this the server can't never get the order data
export async function submitOrder(orderData: CustomerOrderData): Promise<void> {
    console.log("Submitting order...")
    console.log(orderData)

    try {
        const response = await fetch(process.env.SERVER_URL + '/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })

        const result = await response.json()
        if (response.ok) {
            console.log('Order submitted successfully')
        } else {
            // Handle error
            console.error('Failed to submit order:', result)
        }
    } catch (error) {
        console.error('Error to submit order:', error)
        // Handle network or other errors
    }
}