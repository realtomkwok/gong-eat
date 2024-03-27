// Root layout for the app

import type {Metadata} from "next";
import "material-symbols/rounded.css"
import "./globals.css";
import {ItemStoreProvider} from "@/app/providers/item-store-provider";

export const metadata: Metadata = {
    title: "Gong Eats",
    description: "Food Delivery for Wollongong",
};

export default function RootLayout({customer, business}: {
    customer: React.ReactNode,
    business: React.ReactNode
}) {

    const userType: "customer" | "business" = "customer"

    return (
        <html lang="en">
        <body className="font-Sofia antialiased">
        <ItemStoreProvider>
            {userType === "customer" ? customer : business}
        </ItemStoreProvider>
        </body>
        </html>
    );
}
