import {Button} from "@/app/components/button";

export default function NavIsland() {
    let deliveryAddress = "1234 Main St"
    let shoppingBagCount = 0

    return (
        <nav className="flex my-6 px-4 py-3 gap-3 w-max mx-auto rounded-full bg-surfaceContainer text-onSecondContainer">
            <Button icon={{iconName: "account_circle"}} />
            <div className="flex px-2 pb-1 content-center items-center text-2xl font-bold tracking-widest">
                <span>GONG EATS</span>
            </div>
            <Button icon={{iconName: "location_on"}} label={deliveryAddress}/>
            <Button icon={{iconName: "search"}} label="cusine, restaurants, etc..."/>
            <Button icon={{iconName: "shopping_basket"}} label={shoppingBagCount.toString()}/>
        </nav>
    )
}