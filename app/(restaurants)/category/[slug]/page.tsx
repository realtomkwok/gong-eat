import getData from "@/app/lib/get-data";
import {RestaurantData} from "@/app/lib/data-type";
import slugify from "slugify";
import Link from "next/link";
import {Card_Restaurant} from "@/app/components/card";
import {NavCategory} from "@/app/components/nav-category";
import {Button} from "@/app/components/button";


export default async function CategoryPage({params}: { params: { slug: string } }) {
    const currentCategory = params.slug
    const allRestaurants = await getData('/api/restaurants.json')
    const categories = await getData('/api/categories.json')


    let restaurants: RestaurantData[]

    if (currentCategory === 'all') {
        restaurants = allRestaurants
    } else {
        restaurants = allRestaurants.filter((all: RestaurantData) => {
            return all.restaurant_category.includes(currentCategory)
        })
    }

    return (
        <>
            <section
                className="container mx-auto my-12 flex flex-row justify-between items-center flex-initial gap-12">
                <NavCategory props={categories}/>
                <div className="flex flex-row gap-4">
                    <Button icon={{iconName: "casino"}}/>
                    <Button icon={{iconName: "tune"}} label="Filter"/>
                </div>
            </section>
            <section
                className="container mx-auto mb-40 grid gap-6 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
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
                            <Card_Restaurant props={{
                                title: data.restaurant_name,
                                subtitle: data.restaurant_category.join(' | '),
                                description: data.restaurant_rating.toString(),
                                imageSrc: data.restaurant_hero_image,
                                rating: data.restaurant_rating
                            }}/>
                        </Link>
                    )
                })}
            </section>
        </>


    )
}