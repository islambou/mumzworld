import { View, Text, Pressable, Vibration } from "react-native";
import React from "react";
import { TProductsListItem } from "../../fetchers/dtos";
import { Image } from "expo-image";
import { useTheme } from "../../theme/ThemeProvider";
import Rating from "../Rating";
import translate from "../../i18n/translate";
import ProductImage from "./ProductImage";
import { fCurrency } from "../../utils/formatters";
import WhishButton from "../WhishButton";
import * as Haptics from "expo-haptics";

type Props = {
  data: TProductsListItem;
  isInWishList?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  onWhishPress?: () => void;
};
export const PRODUCT_LIST_ITEM_HEIGHT = 300;
const ProductListItem = (props: Props) => {
  const { commonStyles, size, colorPalette } = useTheme();
  const productData = props.data;

  const brandLogo = "https://www.mumzworld.com/media//amasty/shopby/option_images/slider/beabalogo.png";
  const randomRating = Math.floor(Math.random() * 5) + 1;

  return (
    <View
      style={[
        {
          height: PRODUCT_LIST_ITEM_HEIGHT,

          position: "relative",
        },
      ]}
    >
      <Pressable
        onPress={props.onPress}
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          props.onLongPress?.();
        }}
        style={{
          height: "70%",
        }}
      >
        <View style={[commonStyles.br]}>
          <ProductImage source={{ uri: productData.small_image.url }} style={[{ height: "100%" }]} contentFit="contain" />
        </View>
      </Pressable>
      <View
        style={{
          position: "absolute",
          top: size.unit * 2,
          right: size.unit * 2,
        }}
      >
        <WhishButton itemId={productData.id} />
      </View>

      <Rating value={randomRating} style={[commonStyles.mt1]} size={12} />
      <View>
        <View style={[{ flexDirection: "row", gap: size.unit }, commonStyles.row, commonStyles.center.horizontal]}>
          <Image source={{ uri: brandLogo }} style={{ width: size.avatarSmall, height: size.avatarSmall }} contentFit="scale-down" />
          <Text numberOfLines={1} style={[commonStyles.text.caption]}>
            {productData.brand_info?.title || ""}
          </Text>
        </View>
        <Text numberOfLines={2} style={commonStyles.text.bold}>
          {productData.name}
        </Text>
        <View style={{ flexDirection: "row", gap: size.unit }}>
          <Text style={[commonStyles.text.bold, { color: colorPalette.accent }]}>
            {translate({
              price: {
                amout: fCurrency(productData.price_range.minimum_price.final_price.value),
                symbol: translate(productData.price_range.minimum_price.final_price.currency),
              },
            })}
          </Text>
          <Text style={[commonStyles.text.caption, commonStyles.text.lineThrough]}>
            {translate({
              price: {
                amout: fCurrency(productData.price_range.minimum_price.final_price.value),
                symbol: translate(productData.price_range.minimum_price.final_price.currency),
              },
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductListItem;
