import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import SilhouetteBar from "../silhouette/SilhouetteBar";

const ProductDetailsSilhouette = () => {
  const { commonStyles, colorPalette, size } = useTheme();

  return (
    <View style={[commonStyles.flex, commonStyles.ph2]}>
      <View style={[commonStyles.row, { marginBottom: 20 }]}>
        <SilhouetteBar style={{ width: size.avatarMedium, height: size.avatarMedium, borderRadius: size.avatarMedium }} />
        <SilhouetteBar style={{ width: "40%" }} />
      </View>
      <View style={[commonStyles.row, { marginBottom: 20 }]}>
        <View style={{ flex: 1 / 2 }}>
          <SilhouetteBar />
        </View>
        <View style={{ flex: 1 / 2, alignItems: "flex-end" }}>
          <SilhouetteBar style={{ width: 50 }} />
        </View>
      </View>
      <View style={[commonStyles.section]}>
        <SilhouetteBar style={{ marginBottom: 20 }} />
        <SilhouetteBar />
      </View>
    </View>
  );
};

export default ProductDetailsSilhouette;
