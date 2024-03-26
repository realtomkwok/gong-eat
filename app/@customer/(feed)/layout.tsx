import React from "react";
import ClientLayout from "@/app/@customer/(feed)/client-layout";

interface LayoutProps {
    children: React.ReactNode
    modalRestaurant: React.ReactNode
    feed: React.ReactNode
}

export default function CustomerLayout(props: Readonly<LayoutProps>) {
    return (
        <ClientLayout {...props} />
    )
}
