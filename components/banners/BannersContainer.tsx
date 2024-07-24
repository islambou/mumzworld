import React from "react";
import { Dimensions, Text, View, ViewProps } from "react-native";
import Banner from "./Banner";
import { useTheme } from "../../theme/ThemeProvider";
import Dot from "../gelery/Dot";
import { ANIMATION_DURATION } from "../../constants/misc";
import Galery from "../gelery/Galery";

type Props = ViewProps;
const BannersContainer = (props: Props) => {
  const width = Dimensions.get("window").width;
  const { size, commonStyles } = useTheme();
  const banners = [
    <Banner imageUri="https://d2d3ehxuorb8xr.cloudfront.net/2296x650_DESKTOP_BANNER_AR_10_1763470248.jpg" aspectRatio={2296 / 650} />,
    <Banner
      imageUri="https://d2d3ehxuorb8xr.cloudfront.net/MEGA_SAVER_WEEK_EXCLUSIVE_OFFER_2296x650_DESKTOP_BANNER_TOYS_AR_52d4c3711a.jpg"
      aspectRatio={2296 / 650}
    />,
    <Banner imageUri="https://d2d3ehxuorb8xr.cloudfront.net/BOGO_2296x650_DESKTOP_BANNER_AR_1_beea94dd51.jpg" aspectRatio={2296 / 650} />,
    <Banner imageUri="https://d2d3ehxuorb8xr.cloudfront.net/2296x650_DESKTOP_BANNER_AR_SUAVINEX_JULY_172024_11d9c15fcb.jpg" aspectRatio={2296 / 650} />,
  ];

  const allowScroll = banners.length > 1;
  return (
    <View {...props} style={[{ flex: 1 }, commonStyles.center.horizontal, props.style]}>
      <Galery
        loop
        width={width - size.unit * 2 * 2}
        height={130}
        enabled={allowScroll}
        autoPlay={true}
        data={banners}
        scrollAnimationDuration={ANIMATION_DURATION}
        autoPlayInterval={5000}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            {item}
          </View>
        )}
      />
    </View>
  );
};

export default BannersContainer;
