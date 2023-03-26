import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { styled } from "nativewind";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCards, { RestaurantCardsProps } from "./RestaurantCards";
import sanityClient from "../sanity";
export interface FeaturedRowsProps {
  name: string;
  short_description: string;
  _id: string;
}

const StyledText = styled(Text);
const StyledView = styled(View);
const ScrollViewRN = styled(ScrollView);
const FeaturedRows = ({ short_description, name, _id }: FeaturedRowsProps) => {
  const [restaurant, setRestaurants] = React.useState<RestaurantCardsProps[]>([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]
    `,
      { id: _id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      })
      .catch((err) => {
        console.log("Err at Featured Row:", err);
      });
  }, [_id]);

  return (
    <StyledView>
      <StyledView className="space-x-2 flex-row items-center justify-between px-4 mt-4">
        <StyledText className="font-bold text-lg">{name}</StyledText>
        <ArrowRightIcon color={"#00ccbb"} />
      </StyledView>

      <StyledText className="text-xs text-gray-500 px-4">{short_description}</StyledText>

      <ScrollViewRN
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        className="pt-4"
      >
        {/* Restaurant cards */}
        {
          restaurant?.map((item) => (
            <RestaurantCards
              key={item._id}
              _id={item._id}
              name ={item.name}
              image={item.image}
              rating={item.rating}
              address={item.address}
              short_description={item.short_description }
              dishes={item.dishes}
              long={item.long}
              lat={item.lat}
              genre={item.genre }
            />
          ))
        }
        

      </ScrollViewRN>
    </StyledView>
  );
};

export default FeaturedRows;

const styles = StyleSheet.create({});
