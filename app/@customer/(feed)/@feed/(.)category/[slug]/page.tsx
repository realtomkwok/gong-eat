import CategoryPage from "@/app/@customer/(detail)/category/[slug]/page";

export default function CategoryPageSlug({params, searchParams}: { params: { slug: string }, searchParams: { query?: string, page?: string }}) {
    console.log(searchParams)

    return (
        <CategoryPage params={params} searchParams={searchParams}/>
    )
}