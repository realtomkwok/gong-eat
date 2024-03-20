interface RestaurantData {
    restaurant_id: number
    restaurant_name: string
    restaurant_address: string
    restaurant_phone: string
    restaurant_category: [string]
    restaurant_rating: number
    restaurant_revenue: number
    restaurant_hero_image: string
    restaurant_menu: MenuItemData[]
}

interface MenuItemData {
    item_id: number
    // restaurant_id: number
    item_name: string
    item_description?: string
    item_price: number
    item_image: string
}