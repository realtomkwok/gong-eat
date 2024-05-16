import {CategoryData, RestaurantData} from "@/app/api/definitions";
import slugify from "slugify";
import Link from "next/link";
import {Card_Restaurant} from "@/app/components/card";
import getServerData from "@/app/api/get-server-data";
import restaurantCategories from "@/app/api/restaurant-categories";
import {Suspense} from "react";

const CategoryPage = async ({params, searchParams}: {
    params: { slug: string },
    searchParams?: { query?: string, page?: string }
}) => {
    const currentCategory = params.slug
    const allRestaurants = await getServerData('/restaurant/all')
    const allCategories: CategoryData[] = restaurantCategories

    let restaurants: RestaurantData[]

    // Filter by search query
    if (searchParams?.query) {
        const lowercaseQuery = searchParams.query.toLowerCase()
        restaurants = allRestaurants.filter((restaurant: RestaurantData) => {
            const nameMatch = restaurant.restaurant_name.toLowerCase().includes(lowercaseQuery)
            const categoryMatch = allCategories.find((category: CategoryData) => category.category_id === restaurant.category_id)?.category_name.toLowerCase().includes(lowercaseQuery)
            return nameMatch || categoryMatch
        })
    } else {
        // Filter by category
        if (currentCategory === 'all') {
            restaurants = allRestaurants
        } else {
            restaurants = allRestaurants
            // Find category_id matching the `currentCategory`
            const category_id = allCategories.find((category: CategoryData) => category.category_name.toLowerCase() === currentCategory.toLowerCase())?.category_id
            restaurants = allRestaurants.filter((restaurant: RestaurantData) => restaurant.category_id === category_id)
        }
    }

    function getCategory(category_id: number) {
        const categoryData = allCategories.find((category: CategoryData) => category.category_id === category_id)
        return categoryData?.category_name
    }

    return (
        <Suspense>
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
        </Suspense>
    )
}

export default CategoryPage