import { Pressable } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useTheme } from "../theme/ThemeProvider";
import { useStore } from "../store/StoreProvider";
import { ID } from "../fetchers/dtos";

type Props = {
  itemId: ID;
  onPress?: () => void;
  size?: number;
};
const WhishButton = (props: Props) => {
  const { colorPalette, commonStyles, size } = useTheme();
  const { state, dispatch } = useStore();

  const isInWishList = state.wishList.includes(props.itemId);

  const onWhishPress = () => {
    if (isInWishList) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: props.itemId });
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: props.itemId });
    }
  };
  const heartIconName: keyof (typeof Octicons)["glyphMap"] = isInWishList ? "heart-fill" : "heart";
  const heartColor = isInWishList ? colorPalette.red : "black";
  const buttonSize = props.size || size.unit * 8;
  return (
    <Pressable
      onTouchStart={() => {
        // this seems to give a faster feedback
        onWhishPress();
        props.onPress?.();
      }}
      style={[
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize,
          backgroundColor: colorPalette.white,
        },
        commonStyles.center.horizontal,
        commonStyles.center.vertical,
        commonStyles.shadow,
      ]}
    >
      <Octicons name={heartIconName} size={size.unit * 4} color={heartColor} />
    </Pressable>
  );
};

export default WhishButton;
