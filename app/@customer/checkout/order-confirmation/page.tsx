import React from 'react'
import {Button} from "@/app/components/button";
import Link from "next/link.js";

export default function OrderConfirmationPage() {
    // TODO: Refine the UI of this page
    return (
        <div>
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
            <Link href={"/"}>
                <Button icon={{iconName: "arrow_forward"}} label="Back to Home"/>
            </Link>
        </div>
    )
}