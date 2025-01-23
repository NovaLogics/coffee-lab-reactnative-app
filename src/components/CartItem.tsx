import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDER_RADIUS, COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface CartItemProps {
    id: string;
    index: number;
    name: string;
    type: string;
    roasted: string;
    imageLinkSquare: ImageProps;
    specialIngredient: string;
    prices: any;
    incrementQuantityHandler: any;
    decrementQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
    id,
    index,
    name,
    type,
    roasted,
    imageLinkSquare,
    specialIngredient,
    prices,
    incrementQuantityHandler,
    decrementQuantityHandler,
}) => {
    return (
        <View>
            {prices.length != 1 ?
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGrey, COLORS.primaryBlack]}
                    style={styles.cardItemlinearGradient}>
                    {/* Header Row */}
                    <View style={styles.cartItemRow}>
                        {/* Image */}
                        <Image
                            source={imageLinkSquare}
                            style={styles.cartItemImage}
                        />
                        {/* Main Property Views */}
                        <View style={styles.cartItemInfo}>
                            {/* Title Views */}
                            <View>
                                <Text style={styles.cartItemTitle}>
                                    {name}
                                </Text>
                                <Text style={styles.cartItemSubtitle}>
                                    {specialIngredient}
                                </Text>
                            </View>
                            {/* Roasted Level Text */}
                            <View style={styles.cardItemRoastedContainer}>
                                <Text style={styles.cardItemRoastedText}>
                                    {roasted}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* Price Row */}
                    {prices.map((price: any, index: any) => (
                        <View
                            key={index.toString()}
                            style={styles.cartItemSizeRowContainer}>
                            {/* Size List */}
                            <View style={styles.cartItemSizeValueContainer}>
                                <View style={styles.sizeBox}>
                                    {/* Size Items */}
                                    <Text
                                        style={[styles.sizeText,
                                        {
                                            fontSize: type == "Bean" ?
                                                FONT_SIZE.size14 : FONT_SIZE.size16
                                        }]}>
                                        {price.size}
                                    </Text>
                                </View>
                                {/* Price Text */}
                                <Text style={styles.sizeCurrency}>
                                    {price.currency}
                                    {" "}
                                    <Text style={styles.sizePrice}>
                                        {price.price}
                                    </Text>
                                </Text>
                            </View>
                            {/* Action Items */}
                            <View style={styles.cartItemSizeValueContainer}>
                                {/* Minus Button */}
                                <TouchableOpacity
                                    style={styles.cartItemIcon}>
                                    <CustomIcon
                                        name="minus"
                                        color={COLORS.primaryWhite}
                                        size={FONT_SIZE.size10}
                                    />
                                </TouchableOpacity>
                                {/* Qantity Text */}
                                <View style={styles.cartItemQuantityContainer}>
                                    <Text style={styles.cartItemQuantityText}>
                                        {price.quantity}
                                    </Text>
                                </View>
                                {/* Add Button */}
                                <TouchableOpacity
                                    style={styles.cartItemIcon}>
                                    <CustomIcon
                                        name="add"
                                        color={COLORS.primaryWhite}
                                        size={FONT_SIZE.size10}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))}
                </LinearGradient>
                :
                <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    cardItemlinearGradient: {
        flex: 1,
        gap: SPACING.space12,
        padding: SPACING.space12,
        borderRadius: BORDER_RADIUS.radius25,
    },
    cartItemRow: {
        flex: 1,
        flexDirection: "row",
        gap: SPACING.space12,
    },
    cartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDER_RADIUS.radius25,
    },
    cartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space4,
        justifyContent: "space-between",
    },
    cartItemTitle: {
        fontFamily: FONT_FAMILY.poppinsMedium,
        fontSize: FONT_SIZE.size18,
        color: COLORS.primaryWhite,
    },
    cartItemSubtitle: {
        fontFamily: FONT_FAMILY.poppinsRegular,
        fontSize: FONT_SIZE.size14,
        color: COLORS.secondaryLightGrey,
    },
    cardItemRoastedContainer: {
        height: 50,
        width: 120,
        borderRadius: BORDER_RADIUS.radius15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primaryDarkGrey,
    },
    cardItemRoastedText: {
        fontFamily: FONT_FAMILY.poppinsRegular,
        fontSize: FONT_SIZE.size12,
        color: COLORS.primaryWhite,
    },
    cartItemSizeRowContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.space20,
        flexDirection: "row",
    },
    cartItemSizeValueContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    sizeBox: {
        height: 40,
        width: 100,
        backgroundColor: COLORS.primaryBlack,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: BORDER_RADIUS.radius10,
    },
    sizeText: {
        fontFamily: FONT_FAMILY.poppinsMedium,
        color: COLORS.secondaryLightGrey,
    },
    sizeCurrency: {
        fontFamily: FONT_FAMILY.poppinsSemiBold,
        fontSize: FONT_SIZE.size18,
        color: COLORS.primaryOrange,
    },
    sizePrice: {
        fontFamily: FONT_FAMILY.poppinsSemiBold,
        fontSize: FONT_SIZE.size18,
        color: COLORS.primaryWhite,
    },
    cartItemIcon: {
        backgroundColor: COLORS.primaryOrange,
        padding: SPACING.space12,
        borderRadius: BORDER_RADIUS.radius10,
    },
    cartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlack,
        width:60,
        borderRadius: BORDER_RADIUS.radius10,
        borderWidth:2,
        borderColor: COLORS.primaryOrange,
        alignItems: "center",
        paddingVertical: SPACING.space4,
        marginHorizontal: SPACING.space4,
    },
    cartItemQuantityText: {
        fontFamily: FONT_FAMILY.poppinsSemiBold,
        fontSize: FONT_SIZE.size16,
        color: COLORS.primaryWhite,
    },
})

export default CartItem