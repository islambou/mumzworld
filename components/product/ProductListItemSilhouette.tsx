import { View } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import Rating from "../Rating";
import ProductImage from "./ProductImage";
import SilhouetteBar from "../silhouette/SilhouetteBar";
import { SIZE_UNIT } from "../../theme/theme";

export const PRODUCT_LIST_ITEM_HEIGHT = 300;
const ProductListItemSilhouette = () => {
  const { commonStyles, size } = useTheme();

  return (
    <View
      style={[
        {
          height: PRODUCT_LIST_ITEM_HEIGHT,

          position: "relative",
        },
      ]}
    >
      <View
        style={{
          height: "70%",
        }}
      >
        <View style={[commonStyles.br]}>
          <ProductImage style={[{ height: "100%" }]} contentFit="contain" />
        </View>
      </View>

      <Rating value={0} style={[commonStyles.mt1]} size={12} />
      <View>
        <View style={[{ flexDirection: "row", gap: size.unit }, commonStyles.row, commonStyles.center.horizontal]}>
          <SilhouetteBar style={{ width: size.avatarSmall, height: size.avatarSmall, borderRadius: size.avatarSmall, marginBottom: SIZE_UNIT }} />
          <SilhouetteBar style={{ width: "60%", marginBottom: SIZE_UNIT }} />
        </View>
        <SilhouetteBar style={{ width: "80%", marginBottom: SIZE_UNIT }} />
        <SilhouetteBar style={{ width: "40%", marginBottom: SIZE_UNIT }} />
        <View style={{ flexDirection: "row", gap: size.unit, marginBottom: SIZE_UNIT }}>
          <SilhouetteBar style={{ width: "20%" }} />
        </View>
      </View>
    </View>
  );
};

export default ProductListItemSilhouette;
