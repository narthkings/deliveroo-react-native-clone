import { createSlice } from '@reduxjs/toolkit'
import { RestaurantCardsProps } from '../../types'

export interface RestaurantState {
    restaurant: RestaurantCardsProps
  }
  
  const initialState: RestaurantState = {
    restaurant: {
        _id: '',
        name: '',
        image: '',
        rating: 0,
        address: '',
        short_description: '',
        dishes: [],
        long: 0,
        lat: 0,
    },
  }

 const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload
        }
    },
  })
export const {setRestaurant} = restaurantSlice.actions
export const selectRestaurant = (state: any) => state.restaurant.restaurant

export default restaurantSlice.reducer