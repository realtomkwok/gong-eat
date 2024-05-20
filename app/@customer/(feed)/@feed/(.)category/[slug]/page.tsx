import CategoryPage from "@/app/@customer/(detail)/category/[slug]/page";

export default function CategoryPageSlug({params, searchParams}: { params: { slug: string }, searchParams: { query?: string, page?: string }}) {
    return (
        <CategoryPage params={params} searchParams={searchParams}/>
    )
}