import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import React from "react";
import {styled} from "nativewind";
import {selectRestaurant} from "../store/slices/restaurantSlice";
import {useNavigation} from "@react-navigation/native";
import {useAppSelector} from "../store/hooks";
import {XMarkIcon} from "react-native-heroicons/solid";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import * as Progress from 'react-native-progress';
import MapView,{Marker } from 'react-native-maps';

type HomeNavProps = NativeStackNavigationProp<RootStackParamList, "Home">;

const StyledView = styled(View);
const StyledText = styled(Text);
const SafeArea = styled(SafeAreaView);
const TouchableOpacityRN = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledMap = styled(MapView);

const DeliveryScreen = () => {
  const navigation = useNavigation<HomeNavProps>();
  const restaurant = useAppSelector(selectRestaurant);
  return (
    <StyledView className="bg-[#00ccbb] flex-1">
      <SafeArea className="z-50">
        <StyledView className="flex-row justify-between items-center p-5">
          <TouchableOpacityRN onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacityRN>
          <StyledText className="font-light text-white text-lg">Order Help</StyledText>
        </StyledView>
        
        <StyledView className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
        <StyledView className="flex-row justify-between">

          <StyledView> 
            <StyledText className="text-lg text-gray-400">Estimated Arrival</StyledText>
            <StyledText className="text-4xl font-bold">45-55 Minutes</StyledText>
          </StyledView>
          <StyledImage
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
        </StyledView>
        <Progress.Bar indeterminate={true} color="#00CCBB" />

        <StyledText className="text-gray-500 mt-3">
            Your order at {restaurant.name} is being prepared
          </StyledText>
        </StyledView>
      </SafeArea>
      <StyledMap 
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </StyledMap>
      <SafeArea className="bg-white flex-row items-center space-x-5 h-28">
        <StyledImage 
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />

        <StyledView className="flex-1">
          <StyledText className="text-lg">Jordan</StyledText>
          <StyledText className="text-gray-400">Your Rider</StyledText>
        </StyledView>

        <StyledText className="text-[#00CCBB] text-lg mr-5 font-bold">Call</StyledText>
      </SafeArea>
    </StyledView>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({});
