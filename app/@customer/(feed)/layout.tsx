import React from "react";
import ClientLayout, {LayoutProps} from "@/app/@customer/(feed)/client-layout";
import getData from "@/app/api/get-data";
import {CategoryData} from "@/app/api/data-type";


export default async function CustomerLayout(props: Readonly<LayoutProps>) {
    const categoriesData: CategoryData[] = await getData('/api/categories.json')

    return (
        // @ts-ignore
        <ClientLayout categories={categoriesData} {...props} />
    )
}
