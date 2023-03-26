import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import React from "react";
import {styled} from "nativewind";
import {DishRowProps} from "../types";
import formatter from "../utils";
import {urlFor} from "../sanity";
import {MinusCircleIcon, PlusCircleIcon} from "react-native-heroicons/solid";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../store/slices/basketSlice";
import {RootState} from "../store/store";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);
const TouchableOpacityRN = styled(TouchableOpacity);

const DishRow = ({...rest}: DishRowProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) =>
    selectBasketItemsWithId(state, rest._id)
  );
  const [isPressed, setIsPressed] = React.useState<boolean>(false);

  const handleIncrement = () => {
    dispatch(addToBasket({...rest}));
  };

  const handleDecrement = () => {
    if (items.length <= 0) return;
    dispatch(removeFromBasket({...rest, id: rest._id}));
  };

  return (
    <>
      <TouchableOpacityRN
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}
      >
        <StyledView className="flex-row">
          <StyledView className="flex-1 pr-2">
            <StyledText className="text-lg mb-1">{rest.name}</StyledText>
            <StyledText className="text-gray-400">
              {rest.description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quae dignissimos suscipit excepturi quam."}
            </StyledText>
            <StyledText className="text-gray-400 mt-2">
              {formatter(rest.price)}
            </StyledText>
          </StyledView>
          <StyledView>
            <StyledImage
              style={{borderWidth: 1, borderColor: "#f3f3f3"}}
              source={{uri: urlFor(rest.image).url()}}
              className="w-20 h-20 bg-gray-300 p-4 rounded-sm"
            />
          </StyledView>
        </StyledView>
      </TouchableOpacityRN>
      {isPressed && (
        <StyledView className="bg-white px-4">
          <StyledView className="flex-row items-center gap-2 pb-3">
            <TouchableOpacityRN disabled={items.length <= 0} onPress={handleDecrement}>
              <MinusCircleIcon
                size={40}
                color={items.length <= 0 ? "#f3f3f3" : "#00CCBB"}
              />
            </TouchableOpacityRN>
            <Text>{items.length}</Text>
            <TouchableOpacityRN onPress={handleIncrement}>
              <PlusCircleIcon size={40} color={"#00CCBB"} />
            </TouchableOpacityRN>
          </StyledView>
        </StyledView>
      )}
    </>
  );
};

export default DishRow;

const styles = StyleSheet.create({});
