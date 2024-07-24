// Desc: Product image component
// Original product images come with a white background. This component adds a semi-transparent dark overlay to the image to create a subtle contrast
// with the white background of the theme without editing the iamge itself.
import { View, Text, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import { Image, ImageProps, ImageSource } from "expo-image";
import { EdgeInsets } from "react-native-safe-area-context";
import { useStore } from "../../store/StoreProvider";

type Props = ImageProps & {
  imageInset?: Partial<EdgeInsets>;
};
const ProductImage = (props: Props) => {
  return (
    <View style={{ position: "relative" }}>
      <Image {...props} style={[props.style, { marginTop: props.imageInset?.top }]} />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          zIndex: 0,
        }}
      />
    </View>
  );
};

export default ProductImage;
