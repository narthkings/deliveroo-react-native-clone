import { SafeAreaView, Text, View, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRows, { FeaturedRowsProps } from "../components/FeaturedRows";
import client from "../sanity";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const SafeArea = styled(SafeAreaView);
const ScrollViewRN = styled(ScrollView);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCats, setFeaturedCats] = React.useState<FeaturedRowsProps[]>([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client.fetch(`
    *[_type == "featured"]{
      ..., 
    restaurants[]->{
      ...,
      dishes[]->  
    }
    }
  `).then((data) => {
      setFeaturedCats(data);
    }).catch(e=>console.log(e));
  }, []);


  return (
    <SafeArea className={"bg-white pt-5"}>
      {/* HEADER */}
      <StyledView className="flex-row mx-4 pb-3 items-center space-x-2">
        <StyledImage
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <StyledView className="flex-1">
          <StyledText className="text-xs text-gray-400 font-bold">Deliver Now</StyledText>
          <StyledText className="text-xl font-bold">
            Current Location
            <ChevronDownIcon size={20} color="#00ccbb" />
          </StyledText>
        </StyledView>
        <UserIcon size={35} color="#00ccbb" />
      </StyledView>
      {/* search */}
      <StyledView className="flex-row items-center space-x-2 pb-2 mx-4">
        <StyledView className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput placeholder="Restaurants and Cuisines" keyboardType="default" />
        </StyledView>
        <AdjustmentsVerticalIcon size={35} color="#00ccbb" />
      </StyledView>
      {/* body */}
      <ScrollViewRN contentContainerStyle={{ paddingBottom: 100 }} className="bg-gray-100">
        {/* categories */}
        <Categories />
        {/* featured rows */}

        {
          featuredCats?.map((item: FeaturedRowsProps) => (
            <FeaturedRows
              key={item._id}
              _id={item._id}
              name={item.name}
              short_description={item.short_description}
            />
          ))
        }
      </ScrollViewRN>
    </SafeArea>
  );
};

export default HomeScreen;
