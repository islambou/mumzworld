import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import translate from "../../i18n/translate";

const ProductNotFound = () => {
  const { commonStyles, colorPalette, size } = useTheme();
  return (
    <View style={[commonStyles.flex, commonStyles.center.horizontal, commonStyles.center.vertical, commonStyles.p3]}>
      <Text style={[commonStyles.text.h3]}>{translate("we_couldnt_find_any_product")}</Text>
      <Text style={[commonStyles.text.caption]}>{translate("try_with_other_criteria")}</Text>
    </View>
  );
};

export default ProductNotFound;
