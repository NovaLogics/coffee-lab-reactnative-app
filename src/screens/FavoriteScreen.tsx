import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useStore } from '../state/useStore';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import FavoriteItemCard from '../components/FavoriteItemCard';
import { colors } from '../config/colors';
import { spacing } from '../config/dimensions';
import { SCREENS } from '../navigation/routes';

const FavoriteScreen = ({ navigation, route }: any) => {
  const tabBarHeight = useBottomTabBarHeight();

  const favoriteList = useStore((state: any) => state.favoriteList);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);

  const toggleFavorite = (isFavorite: boolean, id: string, type: string) => {
    isFavorite ? deleteFromFavoriteList(id, type) : addToFavoriteList(id, type);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Status Bar */}
      <StatusBar backgroundColor={colors.primary.black} />
      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View
          style={[styles.innerScrollView, { marginBottom: tabBarHeight }]}>
          <View
            style={styles.itemContainer}>
            {/* Header Bar */}
            <HeaderBar title={"Favorites"} />
            {/* Favorite Items */}
            {favoriteList.length == 0 ?
              (<EmptyListAnimation title={"No Favorites"} />)
              :
              (<View style={styles.listItemContainer}>
                {favoriteList.map((item: any) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      navigation.push(SCREENS.DETAIL,
                        {
                          index: item.index,
                          id: item.id,
                          type: item.type,
                        }
                      );
                    }}>
                    <FavoriteItemCard
                      id={item.id}
                      name={item.name}
                      type={item.type}
                      ingredients={item.ingredients}
                      specialIngredient={item.specialIngredient}
                      averageRating={item.averageRating}
                      ratingCount={item.ratingsCount}
                      description={item.description}
                      roasted={item.roasted}
                      isFavorite={item.isFavorite}
                      toggleFavorite={toggleFavorite}
                      imageLink={item.imageLinkPortrait}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              )}
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.primary.black,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  innerScrollView: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: spacing.space20,
    gap: spacing.space20,
  },
})

export default FavoriteScreen;