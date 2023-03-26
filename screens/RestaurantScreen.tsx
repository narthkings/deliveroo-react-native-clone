import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import {RouteProp, useNavigation} from "@react-navigation/native";
import React, { useEffect } from "react";
import {styled} from "nativewind";
import {useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../types";
// import {useLayoutEffect} from "react";
import {urlFor} from "../sanity";
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/solid";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useAppDispatch } from "../store/hooks";
import { setRestaurant } from "../store/slices/restaurantSlice";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const SafeArea = styled(SafeAreaView);
const TouchableOpacityRN = styled(TouchableOpacity);
const ScrollViewRN = styled(ScrollView);

type HomeNavProps = NativeStackNavigationProp<RootStackParamList, "Home">;

const RestaurantScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeNavProps>();

  const {
    params: {...rest},
  } = useRoute<RouteProp<RootStackParamList, "Restaurant">>();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);
 
  useEffect(() => {
    dispatch(setRestaurant(rest))
  }, [ ])
  return (
    <>
    <BasketIcon />
    <ScrollViewRN>
      <StyledView className="relative">
        <StyledImage
          source={{
            uri: urlFor(rest.image).url(),
          }}
          className="h-56 w-full bg-gray-300 p-4"
        />
        <StyledView className="absolute left-4 top-14 bg-white p-2 rounded-full">
          <TouchableOpacityRN
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <ArrowLeftIcon size={22} color="#00CCBB" />
          </TouchableOpacityRN>
        </StyledView>
        <StyledView className="bg-white">
          <StyledView className="px-4 pt-4">
            <StyledText className="font-bold text-3xl">{rest.name}</StyledText>
            <StyledView className="flex-row my-1 space-x-1">
              <StyledView className="flex-row items-center gap-2">
                <StarIcon opacity={0.4} size={22} color="green" />
                <StyledText className="text-xs text-gray-500">
                  <StyledText className="text-green-500">{rest.rating}</StyledText>
                </StyledText>
              </StyledView>

              <StyledView className="flex-row items-center gap-2">
                <MapPinIcon opacity={0.4} size={22} color="gray" />
                <StyledText className="text-xs text-gray-500">
                  Nearby . {rest.address}
                </StyledText>
              </StyledView>
            </StyledView>

            <StyledText className="text-xs mt-2 pb-4  text-gray-500">
              {rest.short_description}
            </StyledText>
          </StyledView>
          <TouchableOpacityRN className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon size={22} opacity={0.4} color="gray" />
            <StyledText className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </StyledText>
            <ChevronRightIcon size={22} opacity={0.4} color="#00CCBB" />
          </TouchableOpacityRN>
        </StyledView>
        <StyledView className="pb-56">
          <StyledText className="text-xl font-bold px-4 pt-6 mb-3">Menu</StyledText>
          {/* dish row */}
          {rest.dishes.map((dish, index) => (
            <DishRow
              image={dish.image}
              price={dish.price}
              _id={dish._id}
              name={dish.name}
              description={dish.description}
              key={dish._id}
            />
          ))}
        </StyledView>
      </StyledView>
    </ScrollViewRN>
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({});
