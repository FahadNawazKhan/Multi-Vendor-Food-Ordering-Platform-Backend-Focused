import { Restaurant } from "../models/Restaurant.js"

export const getAllRestaurantsService = async () => {
    try {
        return await Restaurant.find()
    } catch (error) {
        throw new Error(error)
    }
}

export const createRestaurantService = async (data) => {
    try {
        return await Restaurant.create(data)
    } catch (error) {
        throw new Error(error)
    }
}

export const getRestaurantByIdService = async () => {

}

export const updateRestaurantService = async () => {

}

export const deleteRestaurantService = async () => {
    
}

// createRestaurantService
// getRestaurantByIdService
// getAllRestaurantsService
// updateRestaurantService
// deleteRestaurantService