import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

import COFFEE_COLLECTION from "../data/coffeeCollection";
import BEANS_COLLECTION from "../data/beansCollection";
import { addToCart, calculateCartPrice } from "./util/cartActions";
import { addToFavoriteList, deleteFromFavoriteList } from "./util/favoriteActions";

export const useStore = create(
    persist(
        (set, get) => ({
            coffeeList: COFFEE_COLLECTION,
            beanList: BEANS_COLLECTION,
            cartPrice: 0,
            favoriteList: [],
            cartList: [],
            orderHistoryList: [],
            addToCart: (cartItem: any) =>
                set(produce((state) => addToCart(state, cartItem))),
            calculateCartPrice: () =>
                set(produce((state) => calculateCartPrice(state))),
            addToFavoriteList: (type: string, id: string) =>
                set(produce((state) => addToFavoriteList(state, type, id))),
            deleteFromFavoriteList: (id: string, type: string) =>
                set(produce((state) => deleteFromFavoriteList(state, type, id))),
        }),
        {
            name: "coffee-lab-app",
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);