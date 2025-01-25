import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'
import { images } from '../config/assets'

const ProfilePicture = () => {
    return (
        <View
            style={styles.imageContainer}>
            <Image
                source={images.avatarDefault}
                style={styles.image} />
        </View>
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        height: SPACING.space36,
        width: SPACING.space36,
        borderRadius: SPACING.space12,
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGrey,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    image: {
        height: SPACING.space36,
        width: SPACING.space36,
    }
})

export default ProfilePicture