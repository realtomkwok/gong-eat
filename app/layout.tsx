// Root layout for the app
import React from "react";
import type {Metadata} from "next";
import "material-symbols/rounded.css"
import "./globals.css";
import {ItemStoreProvider} from "@/app/providers/item-store-provider";
import {ThemeStoreProvider} from "@/app/providers/theme-store-provider";
import ClientLayout from "@/app/client-layout";

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
        <ThemeStoreProvider>
            <ItemStoreProvider>
                <ClientLayout>
                {userType === "customer" ? customer : business}
                </ClientLayout>
            </ItemStoreProvider>
        </ThemeStoreProvider>
    );
}
