import { Animated, Dimensions, FlatList, ImageProps, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useRef, useState } from 'react'
import { useStore } from '../state/useStore'
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
import { fonts, fontSizes } from '../config/fonts';
import { colors } from '../config/colors';
import { borderRadius, spacing } from '../config/dimensions';
import { SCREENS } from '../navigation/routes';
import { Product } from '../types/productTypes';

const SCREEN_WIDTH = Dimensions.get("window").width;

interface HomeScreenProps {
  navigation: any; 
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const listRef = useRef<FlatList<Product>>(null);
  const tabBarHeight = useBottomTabBarHeight();

  const beanList = useStore((state: any) => state.beanList);
  const addToCart = useStore((state: any) => state.addToCart);
  const coffeeList = useStore((state: any) => state.coffeeList);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState(
    getCategoriesFromList(coffeeList)
  );
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getSortedCoffeeList(categoryIndex.category, coffeeList)
  );

  const handleCategoryChange = (index: number) => {
    scrollToTopWithAnimation(listRef);
    setCategoryIndex({
      index: index,
      category: categories[index]
    });
    setSortedCoffee([
      ...getSortedCoffeeList(categories[index], coffeeList),
    ]);
  }

  const searchCoffee = (search: string) => {
    if (search != "") {
      scrollToTopWithAnimation(listRef);
    }
    setCategoryIndex({
      index: 0, category: categories[0]
    });
    setSortedCoffee([
      ...coffeeList.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    ]);
  };

  const resetSearchCoffee = () => {
    scrollToTopWithAnimation(listRef);
    setCategoryIndex({
      index: 0, category: categories[0]
    });
    setSortedCoffee([...coffeeList]);
    setSearchText("");
  };


  const coffeeCardAddToCartHandler = (
    id: string,
    index: any,
    name: string,
    type: string,
    roasted: string,
    imageLinkSquare: ImageProps,
    specialIngredient: string,
    price: any,
  ) => {
    addToCart({
      id,
      index,
      name,
      type,
      roasted,
      imageLinkSquare,
      specialIngredient,
      prices: [{ ...price, quantity: 1 }],
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <View
      style={styles.screenContainer}>
      {/* Status Bar */}
      <StatusBar backgroundColor={colors.primary.black} />
      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        {/* Header Bar */}
        <HeaderBar title={"CoffeeLab"} />
        {/* Title Text */}
        <Text style={styles.titleText}>
          Find the best
          {"\n"}
          coffee for you
        </Text>
        {/* Search Input */}
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          onSearchCoffee={search => searchCoffee(search)}
          onResetSearch={resetSearchCoffee}
        />
        {/* Category Scroller */}
        <CategoryScroller
          categories={categories}
          categoryIndex={categoryIndex.index}
          onCategoryChange={index => handleCategoryChange(index)}
        />
        {/* Coffee Flatlist */}
        <FlatList
          horizontal
          data={sortedCoffee}
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push(SCREENS.DETAIL, {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  name={item.name}
                  type={item.type}
                  roasted={item.roasted}
                  imageLinkSquare={item.imageLinkSquare}
                  specialIngredient={item.specialIngredient}
                  averageRating={item.averageRating}
                  price={item.prices[2]}
                  onPressHandler={(
                    id: string,
                    index: any,
                    name: string,
                    type: string,
                    roasted: string,
                    imageLinkSquare: ImageProps,
                    specialIngredient: string,
                    price: any,
                  ) => coffeeCardAddToCartHandler(
                    id,
                    index,
                    name,
                    type,
                    roasted,
                    imageLinkSquare,
                    specialIngredient,
                    price,
                  )}
                />
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.categoryText}>No Coffee Available!</Text>
            </View>
          }
        />
        {/* Title Text */}
        <Text style={styles.coffeeBeansTitle}>
          Coffee Beans
        </Text>
        {/* Beans Flatlist */}
        <FlatList
          horizontal
          data={beanList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.flatListContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push(SCREENS.DETAIL, {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  name={item.name}
                  type={item.type}
                  roasted={item.roasted}
                  imageLinkSquare={item.imageLinkSquare}
                  specialIngredient={item.specialIngredient}
                  averageRating={item.averageRating}
                  price={item.prices[2]}
                  onPressHandler={(
                    id: string,
                    index: any,
                    name: string,
                    type: string,
                    roasted: string,
                    imageLinkSquare: ImageProps,
                    specialIngredient: string,
                    price: any,
                  ) => coffeeCardAddToCartHandler(
                    id,
                    index,
                    name,
                    type,
                    roasted,
                    imageLinkSquare,
                    specialIngredient,
                    price,
                  )}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  )
}

// UTILITY FUNCTIONS
// ->
const getCategoriesFromList = (coffeeList: any[]) => {
  const categoryCounts: Record<string, number> = {};

  coffeeList.forEach((item) => {
    if (!categoryCounts[item.name]) {
      categoryCounts[item.name] = 0;
    } else {
      categoryCounts[item.name]++;
    }
  });
  // Create categories list with "All" at the start
  const categories = ["All", ...Object.keys(categoryCounts)];
  return categories;
};

const getSortedCoffeeList = (seletedCategory: string, coffeeList: any[]) => {
  if (seletedCategory == "All") return coffeeList;

  const sortedList = coffeeList.filter(
    (coffeeCategory: any) => coffeeCategory.name == seletedCategory
  )
  return sortedList;
}

const scrollToTopWithAnimation = (listRef: React.RefObject<any>) => {
  if (listRef?.current) {
    const scrollValue = new Animated.Value(0);

    Animated.timing(scrollValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    listRef.current.scrollToOffset({
      animated: true,
      offset: 0,
    });
  }
};


// COMPONENTS
// ->
const SearchInput = (
  { searchText, setSearchText, onSearchCoffee, onResetSearch }:
    {
      searchText: string;
      setSearchText: (text: string) => void;
      onSearchCoffee: (text: string) => void;
      onResetSearch: () => void;
    }
) => {
  return (
    <View
      style={styles.inputContainer}>
      <TouchableOpacity
        onPress={() => onSearchCoffee(searchText)}>
        <CustomIcon
          name="search"
          size={fontSizes.size18}
          color={
            searchText.length > 0
              ? colors.primary.orange
              : colors.primary.lightGrey
          }
          style={styles.inputIcon}
        />
      </TouchableOpacity>
      <TextInput
        placeholder={"Find your Coffee..."}
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          onSearchCoffee(searchText);
        }}
        placeholderTextColor={colors.primary.lightGrey}
        style={styles.textInputContainer}
      />
      {
        searchText.length > 0
          ? (<TouchableOpacity
            onPress={() => onResetSearch()}>
            <CustomIcon
              style={styles.inputIcon}
              name="close"
              size={fontSizes.size16}
              color={colors.primary.lightGrey} />

          </TouchableOpacity>)
          : (<></>)
      }
    </View>
  );
};

const CategoryScroller = (
  { categories, categoryIndex, onCategoryChange }:
    {
      categories: any[];
      categoryIndex: number;
      onCategoryChange: (index: number) => void;
    }
) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryScrollViewContentContainer}>
      {
        categories.map((category, index) => (
          <View
            key={index.toString()}
            style={styles.categoryScrollViewContainer}>
            <TouchableOpacity
              onPress={() => onCategoryChange(index)}
              style={styles.categoryScrollViewItem}>
              <Text
                style={[
                  styles.categoryText,
                  categoryIndex == index ? { color: colors.primary.orange } : {},
                ]}>
                {category}
              </Text>
              {categoryIndex == index
                ? <View style={styles.activeCategory} />
                : <></>
              }
            </TouchableOpacity>
          </View>
        ))
      }
    </ScrollView>
  );
};

// STYLES
// ->
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.primary.black,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  titleText: {
    fontSize: fontSizes.size28,
    fontFamily: fonts.poppins.semiBold,
    color: colors.primary.white,
    paddingStart: spacing.space24,
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: spacing.space24,
    marginVertical: spacing.space16,
    borderRadius: borderRadius.radius20,
    backgroundColor: colors.primary.darkGrey,
    alignItems: "center",
  },
  inputIcon: {
    marginHorizontal: spacing.space20,
  },
  textInputContainer: {
    flex: 1,
    height: spacing.space20 * 3,
    fontFamily: fonts.poppins.medium,
    fontSize: fontSizes.size14,
    color: colors.primary.white,
  },
  categoryScrollViewContentContainer: {
    paddingHorizontal: spacing.space20,
    marginBottom: spacing.space2,
    marginTop: spacing.space10,
  },
  categoryScrollViewContainer: {
    paddingHorizontal: spacing.space10,
  },
  categoryScrollViewItem: {
    alignItems: "center",
  },
  categoryText: {
    fontSize: fontSizes.size16,
    fontFamily: fonts.poppins.semiBold,
    color: colors.primary.lightGrey,
    marginBottom: spacing.space4,
  },
  activeCategory: {
    height: spacing.space4,
    width: spacing.space16,
    borderRadius: borderRadius.radius10,
    backgroundColor: colors.primary.orange,
  },
  flatListContainer: {
    gap: spacing.space20,
    paddingVertical: spacing.space20,
    paddingHorizontal: spacing.space30,
  },
  coffeeBeansTitle: {
    fontSize: fontSizes.size20,
    marginLeft: spacing.space30,
    marginTop: spacing.space8,
    fontFamily: fonts.poppins.medium,
    color: colors.primary.lightGrey,
  },
  emptyListContainer: {
    width: SCREEN_WIDTH - spacing.space30 * 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.space36 * 3,
  },
})

export default HomeScreen