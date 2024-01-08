import { Shop } from "./shop";

export interface User {
    id: number;
    username: string;
    password: string;
    shop: Shop;
}