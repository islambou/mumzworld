import { View, ScrollView, StatusBar } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { RootBottomTabParamList, RootStackParamList } from "../../navigation/types";
import { useProductsListQuery } from "../../fetchers/hooks/requestHooks";
import { FetchProductsListParams, ID } from "../../fetchers/dtos";
import { useTheme } from "../../theme/ThemeProvider";
import { CompositeScreenProps } from "@react-navigation/native";
import ProductsList from "../../components/product/ProductsList";
import { filterProducts } from "../../utils/apiHelpers";
import { useStore } from "../../store/StoreProvider";
import ProductNotFound from "../../components/product/ProductNotFound";
import ProductsListSilhouette from "../../components/product/ProductsListSilhouette";

type Props = CompositeScreenProps<BottomTabScreenProps<RootBottomTabParamList, "WishList">, NativeStackScreenProps<RootStackParamList, "MainNavigation">>;

const WishListScreen = (props: Props) => {
  const initialFilter: FetchProductsListParams = {};
  const { state } = useStore();
  const { commonStyles, colorPalette } = useTheme();
  const { data, isFetching } = useProductsListQuery({ queryParams: initialFilter });
  const products = data?.data.products.items;

  const onItemPressHandler = (id: ID) => {
    props.navigation.navigate("ProductDetails", { productId: id });
  };
  //----------------------------------------
  const filteredProducts = products ? filterProducts(products, { is_in_wishlist: true }, state.currentLocation, state.wishList) : undefined;

  //----------------------------------------
  const isDataAvailable = !!filteredProducts?.length;

  return (
    <View style={[commonStyles.screen]}>
      <StatusBar barStyle="dark-content" backgroundColor={colorPalette.background} />

      <ScrollView style={[{ flex: 1 }, commonStyles.p2]}>
        {!isDataAvailable && !isFetching && <ProductNotFound />}
        {isFetching && <ProductsListSilhouette />}
        {isDataAvailable && <ProductsList products={filteredProducts} onItemPress={onItemPressHandler} />}
      </ScrollView>
    </View>
  );
};

export default WishListScreen;
