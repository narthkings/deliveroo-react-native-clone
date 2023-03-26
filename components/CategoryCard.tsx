import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'

export interface CategoryCardProps {
    image: string
    name: string
    _id?:  string
}
const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(Text)
const Touchable = styled(TouchableOpacity)

const CategoryCard = ({ image, name }: CategoryCardProps) => {
    return (
        <Touchable className={'relative mr-2'}>
            <StyledImage source={{ uri: image }} className='h-20 w-20 rounded' />
            <StyledText className='absolute bottom-1 left-1 text-white font-bold'>{name}</StyledText>
        </Touchable>
    )
}

export default CategoryCard

const styles = StyleSheet.create({})