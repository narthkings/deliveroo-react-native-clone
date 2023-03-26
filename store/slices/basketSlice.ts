import { createSlice } from '@reduxjs/toolkit'
import { DishRowProps } from '../../types'
import { RootState } from '../store';

export interface BasketState {
    items: Array<DishRowProps>
  }
  
  const initialState: BasketState = {
    items: [],
  }

 const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
      addToBasket: (state, action) => {
        state.items.push(action.payload) 
      },
      removeFromBasket : (state, action) => {
        const index = state.items.findIndex((item:any) => item._id === action.payload._id)
        let newBasket = [...state.items]
        if (index >= 0) {
          newBasket.splice(index, 1)
        }else{
          console.warn(`Cant remove product (id: ${action.payload._id}) as its not in basket`)
        }
        state.items = newBasket
      },
    },
  })
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state:RootState) => state.basket.items

export const selectBasketItemsWithId = (state:any, id:string) =>
 state.basket.items.filter((item:any) => item._id  === id)

 export const selectBasketTotal = (state:any) => state.basket.items.reduce((total:any, item:any)=>{
    return total += item.price
 }, 0)


export default basketSlice.reducer