import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useAppSelector} from "../store/hooks";
import {RootState} from "../store/store";
import {useNavigation} from "@react-navigation/native";
import {styled} from "nativewind";
import {selectBasketTotal} from "../store/slices/basketSlice";
import formatter from "../utils";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";

const StyledView = styled(View);
const StyledText = styled(Text);
const TouchableOpacityRN = styled(TouchableOpacity);

type BasketNavProps = NativeStackNavigationProp<RootStackParamList, "Basket">;

const BasketIcon = () => {
  const {items} = useAppSelector((state: RootState) => state.basket);
  const navigation = useNavigation<BasketNavProps>();
  const basketTotal = useAppSelector(selectBasketTotal);
  if (items.length === 0) return null;

  return (
    <StyledView className="absolute bottom-10 w-full z-50">
      <TouchableOpacityRN
        onPress={() => navigation.navigate("Basket")}
        className="bg-[#00ccbb] mx-5 p-4 rounded-lg flex-row space-x-1 items-center"
      >
        <StyledText className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </StyledText>
        <StyledText className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </StyledText>
        <StyledText className="text-lg text-white font-extrabold">
          {formatter(basketTotal)}
        </StyledText>
      </TouchableOpacityRN>
    </StyledView>
  );
};

export default BasketIcon;

const styles = StyleSheet.create({});
