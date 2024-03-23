import {MaterialIcon} from "@/app/components/material-icon";
import {Card_MenuItem} from "@/app/components/card";
import getData from "@/app/lib/get-data";
import getID from "@/app/lib/get-id";
import groupItemsByKey from "@/app/lib/group-items";
import Link from "next/link";
import {RestaurantData, MenuItemData} from "@/app/lib/data-type";

export default async function RestaurantPage({params}: { params: { slug: string } }) {

    const restaurantID = getID(params.slug)
    const restaurantData: RestaurantData | undefined = await getData(`/api/restaurants.json`)
        .then((data: RestaurantData[]) => data.find((restaurant: RestaurantData) => restaurant.restaurant_id === restaurantID))
    const menuData: MenuItemData[] | undefined = await getData(`/api/menu/restaurant_id=${restaurantID}.json`)

    if (restaurantData && menuData) {
        const groupedItems = groupItemsByKey(menuData, 'item_category')
        const menuCategories = Object.keys(groupedItems)
        const setByCategory: Set<MenuItemData>[] = menuCategories.map((category) => new Set(groupedItems[category]))
        return (
            <main className="bg-surfaceContainerHighContrast text-onSurface">
                <div className="container mx-auto grid grid-cols-4 gap-6 p-12">
                    <div className="col-span-1 flex flex-col gap-6 sticky top-28 h-fit">
                        <section className="flex flex-col gap-2.5 bg-surfaceContainer p-6 rounded-3xl">
                            <h1 className="font-semibold text-4xl tracking-tight">{restaurantData.restaurant_name}</h1>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <span
                                        className="card-subtitle uppercase">{restaurantData.restaurant_category.join(' | ')}</span>
                                </div>
                                <div className="inline-flex items-center gap-0.5">
                                    <MaterialIcon iconName="star" iconStyle="rounded" weight={600} grade={-25}
                                                  opticalSize={20} fontSize={16}/>
                                    <span className="-translate-y-[1px]">{restaurantData.restaurant_rating}</span>
                                </div>
                            </div>
                        </section>
                        <section className="flex flex-col gap-2.5 bg-surfaceContainer p-6 rounded-3xl">
                            <div className="font-bold uppercase tracking-widest border-b border-outline pb-1 self-center">Menu</div>
                            {menuCategories.map((category, index) => (
                                <Link href={`#${category}`} key={index}>
                                    <span className="card-subtitle uppercase hover:font-semibold">{category}</span>
                                </Link>
                            ))}
                        </section>
                    </div>
                    <div className="col-span-3 bg-surface text-onSurface rounded-3xl p-6">
                        <section className="flex flex-col gap-8">
                            {setByCategory.map((category, index) => {
                                return (
                                    <div id={menuCategories[index]} className="flex flex-col gap-4" key={index}>
                                        <h2 className="font-semibold text-2xl tracking-tight">{menuCategories[index]}</h2>
                                        <div className="grid grid-cols-3 gap-6">
                                            {[...category].map((item, index) => {
                                                return (
                                                    <Card_MenuItem key={index} props={{
                                                        title: item.item_name,
                                                        subtitle: `$${item.item_price}`,
                                                        description: item.item_description,
                                                        imageSrc: item.item_image
                                                    }}/>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                    </div>
                </div>
            </main>
        );
    } else {
        return <h1>Restaurant not found</h1>
    }
}