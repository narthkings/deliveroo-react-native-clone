import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { urlFor } from '../sanity';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RestaurantCardsProps, RootStackParamList } from "../types";

type RestaurantNavProps = NativeStackNavigationProp<RootStackParamList, "Restaurant">;
const TouchableOpacityRN = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledView = styled(View);
const StyledText = styled(Text);

const RestaurantCards = ({ ...rest }: RestaurantCardsProps) => {
  const navigation = useNavigation<RestaurantNavProps>();
  return (
    <TouchableOpacityRN
      onPress={() => {
        navigation.navigate("Restaurant", { ...rest })
      }}
      className="bg-white mr-3 shadow">
      <StyledImage className="w-64 h-36 rounded-sm" source={{ uri: urlFor(rest.image).url() }} />
      <StyledView className="px-3 pb-4">
        <StyledText className="font-bold text-lg pt-2">{rest.name}</StyledText>
        <StyledView className="flex-row items-center space-x-1">
          <StarIcon opacity={0.5} size={22} color="green" />
          <StyledText className="text-xs text-gray-500">
            <StyledText className="tex t-green-500">{rest.rating}</StyledText>
          </StyledText>
        </StyledView>
        <StyledView className="flex-row items-center space-x-1">
          <MapPinIcon opacity={0.4} size={22} color="gray" />
          <StyledText className="text-xs text-gray-500">Nearby . {rest.address}</StyledText>
        </StyledView>
      </StyledView>
    </TouchableOpacityRN>
  );
};

export default RestaurantCards;

const styles = StyleSheet.create({});
