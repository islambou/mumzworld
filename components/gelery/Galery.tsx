import { View, Text } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel/src/Carousel";
import { TCarouselProps } from "react-native-reanimated-carousel/src/types";
import Dot from "./Dot";
import { useTheme } from "../../theme/ThemeProvider";

const Galery = (props: TCarouselProps) => {
  const { size, commonStyles } = useTheme();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const imagesToDisplay = props.data.slice(0, 10); // Limit the number of images to display to avoid perf issues

  return (
    <View style={[{ flex: 1 }, commonStyles.center.horizontal, props.style]}>
      <Carousel
        {...props}
        data={imagesToDisplay}
        onSnapToItem={(index) => {
          setActiveIndex(index);
          props.onSnapToItem?.(index);
        }}
      />
      <View style={{ flexDirection: "row", gap: size.unit, marginTop: -16 }}>
        {imagesToDisplay.map((_, index) => (
          <Dot key={index} active={index === activeIndex} />
        ))}
      </View>
    </View>
  );
};

export default Galery;
