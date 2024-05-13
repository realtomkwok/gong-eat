'use server'

import {CartItemData, SubmitOrderData} from "@/app/api/definitions";
import {permanentRedirect} from "next/navigation";

export async function submitOrder(orderData: SubmitOrderData): Promise<void> {
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
            // Push the order ID to the URL
            // TODO: Fix this for the actual order ID
            // permanentRedirect(`checkout/order-confirmation/`)

        } else {
            // Handle error
            console.error('Failed to submit order:', result)
            alert('Failed to submit order')
        }
    } catch (error) {
        console.error('Error to submit order:', error)
        alert(`Error to submit order: ${error}`, )
        // Handle network or other errors
    }

}

export async function submitItems(itemData: CartItemData): Promise<void> {
    console.log("Submitting items...")
    console.log(itemData)

    try {
        const response = await fetch(process.env.SERVER_URL + '/api/orderitems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        })

        const result = await response.json()
        if (response.ok) {
            console.log('Items submitted successfully')
            console.log(result)
            // permanentRedirect(`checkout/order-confirmation/`)
        } else {
            // Handle error
            console.error('Failed to submit items:', result)
            alert('Failed to submit items')
        }
    } catch (error) {
        console.error('Error to submit items:', error)
        alert(`Error to submit items: ${error}`, )
        // Handle network or other errors
    }
}