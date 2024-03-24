// Root layout for the (restaurants) app

import type {Metadata} from "next";
import "material-symbols/rounded.css"
import "./globals.css";
import {ClientLayout, LayoutProps} from "@/app/(restaurants)/client-layout";

export const metadata: Metadata = {
    title: "Gong Eats",
    description: "Food Delivery for Wollongong",
};

export default function RootLayout(props: Readonly<LayoutProps>) {
    return (
        <html lang="en">
        <body className="font-Sofia antialiased">
        <ClientLayout {...props} />
        </body>
        </html>
    );
}
