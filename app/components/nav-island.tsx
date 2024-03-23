import Link from "next/link";
import {Button} from "@/app/components/button";
import Search from "@/app/components/search";
import React from "react";

export default function NavIsland() {
    let deliveryAddress = "1234 Main St"
    let shoppingBagCount = 0

    return (
        <nav className="flex px-4 py-3 gap-3 w-max mx-auto rounded-full bg-surfaceContainer text-onSecondContainer sticky top-6 z-50">
            <Button icon={{iconName: "account_circle"}} />
            <div className="flex px-2 pb-1 content-center items-center text-2xl font-bold tracking-widest">
                <Link href="/">
                    <span>GONG EATS</span>
                </Link>
            </div>
            <Button icon={{iconName: "location_on"}} label={deliveryAddress}/>
            <Search placeholder={"Cuisine, Restaurants, etc..."}/>  {/* TODO: Add search functionality */}
            <Button icon={{iconName: "shopping_basket"}} label={shoppingBagCount.toString()}/>
        </nav>
    )
}