import React from "react";
import ClientLayout from "@/app/@customer/(feed)/client-layout";
import {CategoryData} from "@/app/api/definitions";
import RestaurantCategories from "@/app/api/restaurant-categories";


export default async function CustomerLayout(props: any) {
    // TODO: Change it to actual data from server
    // const categoriesData: CategoryData[] = await getData('/api/categories.json')
    const categoriesData: CategoryData[] = RestaurantCategories

    return (
        // @ts-ignore
        <ClientLayout categories={categoriesData} {...props} />
    )
}
