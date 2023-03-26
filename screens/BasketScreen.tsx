import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, {useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {DishRowProps, RootStackParamList} from "../types";
import {selectRestaurant} from "../store/slices/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../store/slices/basketSlice";
import {styled} from "nativewind";
import {XCircleIcon} from "react-native-heroicons/solid";
import {urlFor} from "../sanity";
import formatter from "../utils";

type BasketNavProps = NativeStackNavigationProp<RootStackParamList, "Basket" |"Preparing">;

type GroupedItemsType = {[_id: string]: DishRowProps[]};

const SafeArea = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const TouchableOpacityRN = styled(TouchableOpacity);
const ScrollViewRN = styled(ScrollView);

const BasketScreen = () => {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState<GroupedItemsType>({});
  const restaurant = useAppSelector(selectRestaurant);
  const items = useAppSelector(selectBasketItems);
  const navigation = useNavigation<BasketNavProps>();
  const dispatch = useAppDispatch();
  const basketTotal = useAppSelector(selectBasketTotal);

  useMemo(() => {
    const groupedItems = items.reduce((acc: any, item: any) => {
      (acc[item._id] = acc[item._id] || []).push(item);
      return acc;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const handleRemoveItem = (item: string) => {
    dispatch(removeFromBasket({_id: item}));
  };
  return (
    <SafeArea className="flex-1 bg-white">
      <StyledView className="flex-1 bg-gray-100">
        <StyledView className="p-5 border-b border-[#00ccbb] bg-white shadow-sm">
          <StyledView>
            <StyledText className="text-lg font-bold text-center">Basket</StyledText>
            <StyledText className="text-center text-gray-400">
              {restaurant.name}
            </StyledText>
          </StyledView>

          <TouchableOpacityRN
            className="rounded-full bg-gray-100  absolute top-3 right-5"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <XCircleIcon height={50} width={50} color="#00CCBB" />
          </TouchableOpacityRN>
        </StyledView>

        <StyledView className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5 ">
          <StyledImage
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            source={{uri: "http://links.papareact.com/wru"}}
          />
          <StyledText className="flex-1">Delivery in 50-70 min</StyledText>
          <TouchableOpacityRN>
            <StyledText className="text-[#00ccbb]">Change</StyledText>
          </TouchableOpacityRN>
        </StyledView>

        <ScrollViewRN className="divide-y divide-gray-300">
          {Object.entries(groupedItemsInBasket).map(([key, value]) => (
            <StyledView
              key={key}
              className="flex-row items-center justify-between space-x-3 bg-white py-2 px-5"
            >
              <StyledText className="text-[#00ccbb]">{value.length} x </StyledText>
              <StyledImage
                className="h-12 w-12 p-4 rounded-full"
                source={{uri: urlFor(value[0]?.image).url()}}
              />
              <StyledText className="flex-1">{value[0]?.name}</StyledText>
              <StyledText className="text-lg text-gray-600 font-extrabold">
                {formatter(value[0]?.price)}
              </StyledText>
              <TouchableOpacityRN onPress={() => handleRemoveItem(key)}>
                <StyledText className="text-[#00ccbb] text-xs">Remove</StyledText>
              </TouchableOpacityRN>
            </StyledView>
          ))}
        </ScrollViewRN>

        <StyledView className="p-5 bg-white mt-5 space-y-4">
          <StyledView className="flex-row items-center justify-between">
            <StyledText className="text-gray-400">Subtotal</StyledText>
            <StyledText className="text-gray-400">{formatter(basketTotal)}</StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="p-5 bg-white space-y-4">
          <StyledView className="flex-row items-center justify-between">
            <StyledText className="text-gray-400">Delivery Fee</StyledText>
            <StyledText className="text-gray-400">{formatter(100)}</StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="p-5 bg-white space-y-4">
          <StyledView className="flex-row items-center justify-between">
            <StyledText>Order Total</StyledText>
            <StyledText className="font-bold">{formatter(basketTotal + 100)}</StyledText>
          </StyledView>

          <TouchableOpacityRN onPress={() => navigation.navigate('Preparing')} className="rounded-lg bg-[#00CCBB] p-4">
            <StyledText className="text-center text-white text-lg font-bold">
              Place Order
            </StyledText>
          </TouchableOpacityRN>
        </StyledView>
      </StyledView>
    </SafeArea>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({});
