// Root layout for the app

import type {Metadata} from "next";
import "material-symbols/rounded.css"
import "./globals.css";

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
        {userType === "customer" ? customer : business}
        </body>
        </html>
    );
}
