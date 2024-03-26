import CategoryPage from "@/app/@customer/(detail)/category/[slug]/page";

export default function FeedMainPage() {
    return (
        <CategoryPage params={{slug: 'all'}} />
    )
}