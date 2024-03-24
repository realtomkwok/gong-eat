import CategoryPage from "@/app/(restaurants)/category/[slug]/page";

export default async function Home() {

    return (
        <main className="w-full text-onSurface">
            <CategoryPage params={{slug: 'all'}} />
        </main>
    )
}
