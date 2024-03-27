import {UUID} from "node:crypto";

export interface RestaurantData {
    restaurant_id: UUID
    restaurant_name: string
    restaurant_address: string
    restaurant_phone: string
    restaurant_category: [string]
    restaurant_rating: number
    restaurant_revenue: number
    restaurant_hero_image: string
}

export interface CustomerData {
    customer_id: UUID
    customer_name: string
    customer_phone: string
    customer_address: string
    vip_status: "0" | "1"
    vip_expire: Date
}

export interface MenuItemData {
    restaurant_id: any;
    item_id: number
    item_name: string
    item_category: string
    item_description?: string
    item_price: number
    item_image: string
}

export interface OrderData {
    order_id: UUID
    customer_id: number
    restaurant_id: number
    // order_items: [MenuItemData]
    order_status: "confirmed" | "accepted" | "rejected" | "delivered"
    order_subtotal: number
    comment: string
    order_service_fee: number
    order_rating: number
    order_review: string
}

export interface CategoryData {
    category_id: number
    category_name: string
    category_icon: string
    category_slug: string
}