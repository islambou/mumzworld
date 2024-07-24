import React from "react";
import { View, Text, StyleSheet, DimensionValue } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { SIZE_UNIT } from "../theme/theme";

export const NUM_BARS = 50; // number of bars in the chart (ispired by airbnb's price range picker)
type Props = {
  data: Record<number, number>;
  height?: DimensionValue;
};
const ChartComponent = ({ data, height = SIZE_UNIT * 12 }: Props) => {
  const { colorPalette } = useTheme();
  const maxValue = Math.max(...Object.values(data));

  return (
    <View style={[styles.container, { height: height }]}>
      {Object.entries(data).map(([label, value]) => (
        <View key={label} style={[styles.barContainer, { width: "2%" }]}>
          <View style={[styles.bar, { height: `${(value / maxValue) * 100}%`, backgroundColor: colorPalette.text }]} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  barContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
  },
  bar: {
    width: `90%`,
    backgroundColor: "red",
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
  },
  value: {
    fontSize: 14,
  },
});

export default ChartComponent;
