import CategoryPage from "@/app/@customer/(detail)/category/[slug]/page";

export default async function FeedMainPage({searchParams}: {
    searchParams?: {
        query?: string
    }
}) {

    const query = searchParams?.query || ""

    return (
        <CategoryPage params={{slug: 'all'}} query={query}/>
    )
}