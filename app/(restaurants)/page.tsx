import {Card_Restaurant} from "@/app/components/card";
import getData from "@/app/lib/get-data";
import {NavCategory} from "@/app/components/nav-category";
import {Button} from "@/app/components/button";
import Link from "next/link";
import slugify from "slugify";

export default async function Home() {
    const restaurants = await getData('/api/restaurants.json')
    const categories = await getData('/api/categories.json')

    return (
            <main className="w-full text-onSurface">
                <div className="relative">
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
                                <>
                                    <Link                           // Remove the `Link` router when `RestaurantModal` is finished
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
                                </>
                            )
                        })}
                    </section>
                </div>
            </main>
    )
}
