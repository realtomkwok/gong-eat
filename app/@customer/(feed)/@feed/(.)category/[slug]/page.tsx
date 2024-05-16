import CategoryPage from "@/app/@customer/(detail)/category/[slug]/page";
import {Suspense} from "react";

export default function RestaurantModal({params, searchParams}: {
    params: { slug: string },
    searchParams?: { query?: string, page?: string }
}) {

    const query = searchParams?.query || ""

    return (
        <Suspense>
            <CategoryPage params={params} searchParams={{query: query}}/>
        </Suspense>
    )
}