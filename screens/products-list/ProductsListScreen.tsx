import { View, StatusBar } from "react-native";
import React, { useEffect, useRef } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { RootBottomTabParamList, RootStackParamList } from "../../navigation/types";
import { useProductsListQuery } from "../../fetchers/hooks/requestHooks";
import { FetchProductsListParams, ID } from "../../fetchers/dtos";
import { useTheme } from "../../theme/ThemeProvider";
import { CompositeScreenProps } from "@react-navigation/native";
import ProductsList from "../../components/product/ProductsList";
import BannersContainer from "../../components/banners/BannersContainer";
import SearchBar from "../../components/search-bar/SearchBar";
import { filterProducts, getBarndsFromProducts, getCategoriesFromProducts, getPricesFromProducts } from "../../utils/apiHelpers";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import SearchForm from "../../components/search-bar/SearchForm";
import { useStore } from "../../store/StoreProvider";
import { objectCompare } from "../../utils/objectCompare";
import ProductNotFound from "../../components/product/ProductNotFound";
import MultiItemSelector from "../../components/search-bar/MultiItemSelector";
import ProductsListSilhouette from "../../components/product/ProductsListSilhouette";

type Props = CompositeScreenProps<BottomTabScreenProps<RootBottomTabParamList, "ProductsList">, NativeStackScreenProps<RootStackParamList, "ProductDetails">>;

const ProductsListScreen = (props: Props) => {
  const initialFilter: FetchProductsListParams = {};
  const { state } = useStore();
  const { commonStyles, colorPalette } = useTheme();
  const [searchFilter, setSearchFilter] = React.useState<FetchProductsListParams>(initialFilter);
  const [searchFormIsVisible, setSearchFormIsVisible] = React.useState(false);
  const { data, isFetching } = useProductsListQuery({ queryParams: initialFilter /*searchFilter*/ });
  const products = data?.data.products.items;

  const onItemPressHandler = (id: ID) => {
    props.navigation.navigate("ProductDetails", { productId: id });
  };

  const filterOptions = products
    ? {
        brands: getBarndsFromProducts(products),
        categories: getCategoriesFromProducts(products),
        prices: getPricesFromProducts(products),
      }
    : undefined;

  const isfilterChanged = !objectCompare(initialFilter, { ...searchFilter });
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row" }}>
          <SearchBar
            onFilterChange={setSearchFilter}
            onFilterButtonPress={() => {
              if (searchFormIsVisible) {
                bottomSheetRef.current?.close();
              } else {
                bottomSheetRef.current?.expand();
              }
            }}
            style={[{ width: "100%" }]}
            isDirty={isfilterChanged}
            isFormVisible={searchFormIsVisible}
          />
        </View>
      ),
    });
  }, [setSearchFilter, isfilterChanged, searchFormIsVisible]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  //----------------------------------------
  const filteredProducts = products ? filterProducts(products, searchFilter, state.currentLocation, []) : undefined;

  //----------------------------------------
  const onFiltersChange = (filter: Partial<FetchProductsListParams>) => {
    setSearchFilter({ ...searchFilter, ...filter });
  };
  const onFilterReset = () => {
    setSearchFilter(initialFilter);
  };

  const isDataAvailable = !!filteredProducts?.length;

  const dataIsReady = isDataAvailable && !isFetching;
  return (
    <View style={[commonStyles.screen]}>
      <StatusBar barStyle="dark-content" backgroundColor={colorPalette.background} />

      {!dataIsReady && (
        <View style={[commonStyles.p2]}>
          {!isDataAvailable && !isFetching && <ProductNotFound />}
          {isFetching && <ProductsListSilhouette />}
        </View>
      )}
      <ProductsList
        listViewProps={{
          extraData: {
            language: state.currentLanguage,
          },
          ListHeaderComponent: (
            <View>
              <BannersContainer style={[commonStyles.section, commonStyles.mt2]} />
            </View>
          ),
          contentContainerStyle: commonStyles.p2,
        }}
        stickyHeader={
          <View style={[{ backgroundColor: colorPalette.background }]}>
            {!!filterOptions && (
              <MultiItemSelector
                flatListProps={{
                  contentContainerStyle: commonStyles.p2,
                  showsHorizontalScrollIndicator: false,
                  automaticallyAdjustContentInsets: false,
                }}
                values={filterOptions.categories}
                selectedValues={searchFilter.categories || []}
                row
                variant="chip"
                onValuesChange={(data) => {
                  onFiltersChange({ categories: data });
                }}
              />
            )}
          </View>
        }
        products={filteredProducts || []}
        onItemPress={onItemPressHandler}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={["100%"]}
        onClose={() => {
          setSearchFormIsVisible(false);
        }}
        onAnimate={(_, index) => {
          if (index === -1) {
            setSearchFormIsVisible(false);
          } else {
            setSearchFormIsVisible(true);
          }
        }}
      >
        <BottomSheetScrollView style={[commonStyles.p2]}>
          {!!filterOptions && (
            <SearchForm
              {...filterOptions}
              filter={searchFilter}
              onFilterSubmit={(data) => {
                onFiltersChange(data);
                bottomSheetRef.current?.close();
              }}
              onFilterReset={onFilterReset}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default ProductsListScreen;
