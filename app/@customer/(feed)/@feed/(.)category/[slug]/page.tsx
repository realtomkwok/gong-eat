import CategoryPage from "@/app/@customer/(detail)/category/[slug]/page";

export default function RestaurantModal({params}: { params: { slug: string } }) {
    return (
        <CategoryPage params={params}/>
    )
}