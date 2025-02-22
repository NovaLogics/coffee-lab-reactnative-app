import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { colors } from '../../config/colors';

interface PopUpAnimationProps {
    style: any;
    source: any;
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({
    style,
    source,
}) => {
    return (
        <View style={styles.lottieAnimationContainer}>
            <LottieView
                source={source}
                style={style}
                autoPlay
            />
        </View>
    )
}

const styles = StyleSheet.create({
    lottieAnimationContainer: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: colors.secondary.blackTransparent,
        justifyContent: "center",
    },
})

export default PopUpAnimation;