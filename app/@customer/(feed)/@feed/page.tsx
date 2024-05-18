import CategoryPage from "@/app/@customer/(detail)/category/[slug]/page";

export default async function FeedMainPage({searchParams}: { searchParams: { query: string }}) {
    return (
        <CategoryPage params={{slug: 'all'}} searchParams={searchParams}/>
    )
}