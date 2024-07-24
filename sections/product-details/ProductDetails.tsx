import { View, Text, StatusBar, Dimensions, ScrollView } from "react-native";
import React from "react";
import { useProductDetailsQuery } from "../../fetchers/hooks/requestHooks";

import { useTheme } from "../../theme/ThemeProvider";
import ProductImage from "../../components/product/ProductImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStore } from "../../store/StoreProvider";
import { ID } from "../../fetchers/dtos";
import { Image } from "expo-image";
import translate from "../../i18n/translate";
import Rating from "../../components/Rating";
import { fCurrency } from "../../utils/formatters";
import Button from "../../components/button/Button";
import YallaLogo from "../../components/YallaLogo";
import Galery from "../../components/gelery/Galery";
import ProductDetailsSilhouette from "../../components/product/ProductDetailsSilhouette";
import SilhouetteBar from "../../components/silhouette/SilhouetteBar";
const ANIMATION_DURATION = 300;

type Props = {
  productId: ID;
  galeryHeight?: number;
};
const ProductDetailsSection = (props: Props) => {
  const { commonStyles, colorPalette, size } = useTheme();
  const { state } = useStore();
  const productId = props.productId;

  //------------------------------------
  const { data } = useProductDetailsQuery({ queryParams: { productId: productId } });
  //----------------------------------
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const insets = useSafeAreaInsets();
  const galeryHeight = props.galeryHeight || height / 2 + insets.top;
  //----------------------------------
  const defaultProductDetails = data?.data.product[0];

  const localizedProductDetails = data?.data.product.find((p) => p.language === state.currentLanguage);
  const productDetails = localizedProductDetails || defaultProductDetails;
  const productImages = productDetails?.media_gallery.sort((a, b) => a.position - b.position).map((mg) => mg.url);
  const isYalla = true; //productDetails?.is_yalla.includes(state.currentLocation); /**let's just assume it's true */

  return (
    <View style={[commonStyles.screen, { backgroundColor: colorPalette.background }]}>
      <ScrollView>
        {!!productDetails && (
          <Galery
            loop={false}
            width={width}
            height={galeryHeight}
            autoPlay={false}
            data={productImages || []}
            scrollAnimationDuration={ANIMATION_DURATION}
            autoPlayInterval={5000}
            renderItem={({ item }) => <ProductImage source={{ uri: item }} contentFit="contain" style={{ height: galeryHeight }} />}
          />
        )}
        {!productDetails && <SilhouetteBar style={{ width, height: galeryHeight }} />}
        {!productDetails && <ProductDetailsSilhouette />}

        {productDetails && (
          <View style={[commonStyles.flex, commonStyles.ph2]}>
            <View style={[commonStyles.row]}>
              <Image source={{ uri: productDetails?.brand_info.img_src }} contentFit="contain" style={{ width: 64, height: 64 }} />
              <Text style={[commonStyles.text.body2]}>{productDetails?.brand_info.title}</Text>
              {isYalla && <YallaLogo />}
            </View>
            <View style={[commonStyles.row]}>
              <View style={{ flex: 1 / 2 }}>
                <Text style={[commonStyles.text.h2]}>{productDetails?.name}</Text>
              </View>
              <View style={{ flex: 1 / 2, alignItems: "flex-end" }}>
                <Text style={[commonStyles.text.h2, { color: colorPalette.accent }]}>
                  {translate({
                    price: {
                      amout: fCurrency(productDetails?.price.regularPrice.amount.value),
                      symbol: translate(productDetails?.price.regularPrice.amount.currency),
                    },
                  })}
                </Text>
                <Rating value={productDetails?.rating_summary} style={[commonStyles.mt1]} size={12} />
              </View>
            </View>
            <View style={[commonStyles.section]}>
              <Text style={[commonStyles.text.h3]}>{translate("description")}</Text>
              <Text style={[commonStyles.text.caption]}>{productDetails?.features}</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={[{ marginBottom: size.unit * 4 }, commonStyles.p3]}>
        <Button accent title={"add_to_cart"} disabled={!productDetails} />
      </View>
    </View>
  );
};

export default ProductDetailsSection;
