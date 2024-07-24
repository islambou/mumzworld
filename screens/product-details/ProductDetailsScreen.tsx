import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useTheme } from "../../theme/ThemeProvider";
import HeaderButton, { HEADER_BUTTON_SIZE } from "../../components/header/HeaderButton";
import WhishButton from "../../components/WhishButton";
import { useStore } from "../../store/StoreProvider";

import { RootStackParamList } from "../../navigation/types";
import ProductDetailsSection from "../../sections/product-details/ProductDetails";
import { StatusBar } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;
const ProductDetailsScreen = (props: Props) => {
  const { colorPalette } = useTheme();
  const { state } = useStore();
  const productId = props.route.params.productId;
  //------------------------------------
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButton
          icon="arrow-left"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      ),
      headerRight: () => <WhishButton size={HEADER_BUTTON_SIZE} itemId={productId} />,
      headerTitle: "",
    });
  }, [state.wishList]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colorPalette.background} />
      <ProductDetailsSection productId={productId} />
    </>
  );
};

export default ProductDetailsScreen;
