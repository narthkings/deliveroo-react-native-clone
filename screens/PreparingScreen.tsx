import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, { useEffect } from "react";
import {styled} from "nativewind";
import * as Animatable from "react-native-animatable";
import * as Progress from 'react-native-progress';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type DeliveryNavProps = NativeStackNavigationProp<RootStackParamList, "Delivery">;
  
const SafeArea = styled(SafeAreaView);
const AnimatedImage = styled(Animatable.Image);
const AnimatedText = styled(Animatable.Text);
const PreparingScreen = () => {
  const navigation = useNavigation<DeliveryNavProps>(); 

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery")
    }, 3000)
  }, [])

  return (
    <SafeArea className="bg-[#00ccbb] flex-1 justify-center items-center">
      <AnimatedImage
        iterationCount={1}
        className="h-96 w-96"
        animation="slideInUp"
        source={require("../assets/orderLoading.gif")}
      />
      <AnimatedText
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </AnimatedText>
      <Progress.Bar indeterminate={true} color="white" />
    </SafeArea>
  );
};

export default PreparingScreen;

const styles = StyleSheet.create({});
