import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Home: undefined;
    Restaurant: RestaurantCardsProps;
    Basket: undefined;
    Preparing:undefined;
    Delivery:undefined;
}
export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>;

export interface RestaurantCardsProps {
    _id: string;
    name: string;
    image: string;
    rating: number;
    address: string;
    short_description: string;
    dishes: DishRowProps[];
    long: number;
    lat: number;
}

export interface DishRowProps {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}