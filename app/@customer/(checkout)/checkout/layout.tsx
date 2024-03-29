'use client'

import {useItemStore} from "@/app/providers/item-store-provider";
import getItems from "@/app/lib/get-items";
import CheckoutPage from "@/app/@customer/(checkout)/checkout/page";

export default function CheckoutLayout({children}: {children: React.ReactNode}) {
    const {totalCount, items} = useItemStore((state) => state)

    console.log(items)

    const totalPrice = getItems(items).totalPrice
    const groupedItems = getItems(items).groupedItems

    return (
        <>
            <CheckoutPage totalCount={totalCount} totalPrice={totalPrice} groupItems={groupedItems} />
        </>
    )
}