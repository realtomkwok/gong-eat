import getData from "@/app/api/get-data";
import {RestaurantData} from "@/app/api/data-type";
import slugify from "slugify";
import Link from "next/link";
import {Card_Restaurant} from "@/app/components/card";

interface CategoryPageProps {
    params: {
        slug: string
    }
    query: string
}

const CategoryPage = async ({params, query}: CategoryPageProps) => {
    const currentCategory = params.slug
    const allRestaurants = await getData('/api/restaurants.json')

    let restaurants: RestaurantData[]

    if (currentCategory === 'all') {
        restaurants = allRestaurants
    } else {
        restaurants = allRestaurants.filter((all: RestaurantData) => {
            return all.restaurant_category.includes(currentCategory)
        })
    }

    if (query) {
        const lowercaseQuery = query.toLowerCase()
        restaurants = restaurants.filter((all: RestaurantData) => {
            const nameMatch = all.restaurant_name.toLowerCase().includes(lowercaseQuery)
            const categoryMatch = all.restaurant_category.some(category =>
                category.toLowerCase().includes(lowercaseQuery)
            )
            return nameMatch || categoryMatch
        })
    }

    return (
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
                                subtitle={ data.restaurant_category.join(' | ')}
                                imageSrc={data.restaurant_hero_image}
                                rating={data.restaurant_rating}
                            />
                        </Link>
                    )
                })}
            </section>
    )
}

export default CategoryPage