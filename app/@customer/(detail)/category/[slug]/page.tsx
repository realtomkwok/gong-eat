import {CategoryData, RestaurantData} from "@/app/api/definitions";
import slugify from "slugify";
import Link from "next/link";
import {Card_Restaurant} from "@/app/components/card";
import getServerData from "@/app/api/get-server-data";
import getData from "@/app/api/get-data";

export default async function CategoryPage({params}: { params: { slug: string } }) {
    const currentCategory = params.slug
    const allRestaurants = await getServerData('/restaurant/all')
    const allCategories: [CategoryData] = await getData('/api/categories.json')

    let restaurants: RestaurantData[]

    if (currentCategory === 'all') {
        restaurants = allRestaurants
    } else {
        restaurants = allRestaurants
        // Find category_id matching the `currentCategory`
        const category_id = allCategories.find((category: CategoryData) => category.category_name.toLowerCase() === currentCategory.toLowerCase())?.category_id
        restaurants = allRestaurants.filter((restaurant: RestaurantData) => restaurant.category_id === category_id)
    }

    function getCategory(category_id: number) {
        const categoryData = allCategories.find((category: CategoryData) => category.category_id === category_id)
        return categoryData?.category_name
    }

    return (
        <>
            <section
                className="container mx-auto grid gap-6 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {restaurants.map((
                    data: RestaurantData,
                    key: number
                ) => {
                    const slug = slugify(data.restaurant_name, {
                        remove: /[*+~.()'"!:@]/g,
                        lower: true,
                        strict: true
                    })
                    const url = `/restaurant/${slug}_id=${data.restaurant_id}`

                    return (
                        <Link
                            href={url}
                            key={key}
                        >
                            <Card_Restaurant
                                title={data.restaurant_name}
                                // TODO: Fix this `restaurant_category_id` to be a string
                                subtitle={getCategory(data.category_id)}
                                imageSrc={data.restaurant_hero_image}
                                rating={data.restaurant_rating}
                            />
                        </Link>
                    )
                })}
            </section>
        </>


    )
}