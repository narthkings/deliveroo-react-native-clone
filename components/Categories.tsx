import React, {useEffect} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {styled} from "nativewind";
import CategoryCard, {CategoryCardProps} from "./CategoryCard";
import sanityClient from "../sanity";
import {urlFor} from "../sanity";

const StyledView = styled(View);
const StyledText = styled(Text);
const ScrollViewRN = styled(ScrollView);

const Categories = () => {
  const [categories, setCategories] = React.useState<CategoryCardProps[]>([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "category"]`)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <ScrollViewRN
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {/* category card */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          image={urlFor(category.image).width(200).url()}
          name={category.name}
        />
      ))}
    </ScrollViewRN>
  );
};

export default Categories;

const styles = StyleSheet.create({});
