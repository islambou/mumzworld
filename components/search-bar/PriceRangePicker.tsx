import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ChartComponent, { NUM_BARS } from "../MiniChart";
import { Slider } from "@miblanchard/react-native-slider";
import translate from "../../i18n/translate";
import { fCurrency } from "../../utils/formatters";
import { useTheme } from "../../theme/ThemeProvider";
import { Currency } from "../../fetchers/dtos";

type Props = {
  values: number[];
  currency?: Currency;
  onValueChange?: (value: number[]) => void;
};
const PriceRangePicker = ({ values, currency, onValueChange }: Props) => {
  const { commonStyles, colorPalette, size } = useTheme();
  const minValue = values.length ? Math.min(...values) : 0;
  const maxValue = values.length ? Math.max(...values) : 1;
  const [range, setRange] = useState<number[]>([minValue, maxValue]);
  const barSpanValue = Math.ceil((maxValue - minValue) / NUM_BARS);

  const data = Array.from({ length: NUM_BARS }, (_, i) => {
    const start = minValue + i * barSpanValue;
    const end = start + barSpanValue;
    const count = values.filter((v) => v >= start && v < end).length;
    return { start, end, count };
  });
  const chartData = data.reduce((acc, { start, count }) => {
    acc[start] = count;
    return acc;
  }, {} as Record<number, number>);

  const tintStartPercent = ((range[0] - minValue) / (maxValue - minValue)) * 100;
  const tintEndPercent = ((maxValue - range[1]) / (maxValue - minValue)) * 100;

  // making sure range values are coorect
  const rangeStart = range.at(0) || 0;
  const rangeEnd = range.at(1) || 1;
  return (
    <View>
      <View style={{ position: "relative", marginBottom: -18 }}>
        <ChartComponent data={chartData} />
        {/** Left Transparency Tint */}
        <View
          style={[
            styles.tint,
            {
              right: `${100 - tintStartPercent}%`,
              backgroundColor: colorPalette.background,
            },
          ]}
        />

        {/** Right Transparency Tint */}
        <View
          style={[
            styles.tint,
            {
              left: `${100 - tintEndPercent}%`,
              backgroundColor: colorPalette.background,
            },
          ]}
        />
      </View>
      <View style={{ marginBottom: size.unit * 10 /** height of pricing text */ }}>
        <Slider
          value={[rangeStart, rangeEnd]}
          animateTransitions={false}
          onValueChange={(value) => {
            setRange(value);
            onValueChange?.(value);
          }}
          step={barSpanValue}
          maximumValue={maxValue}
          minimumValue={minValue}
          renderBelowThumbComponent={(index) =>
            index === 0 ? (
              <Text style={[commonStyles.bordered, commonStyles.p1, commonStyles.br, { backgroundColor: colorPalette.background }, commonStyles.text.bold]}>
                {translate({
                  price: {
                    amout: fCurrency(rangeStart),
                    symbol: currency ? translate(currency) : "",
                  },
                })}
              </Text>
            ) : null
          }
          renderAboveThumbComponent={(index) =>
            index === 1 ? (
              <Text
                style={[
                  commonStyles.bordered,
                  commonStyles.p1,
                  commonStyles.br,
                  { backgroundColor: colorPalette.background },
                  commonStyles.text.bold,
                  { left: -80 /**this will avoid going out of the container */ },
                ]}
              >
                {translate({
                  price: {
                    amout: fCurrency(rangeEnd),
                    symbol: currency ? translate(currency) : "",
                  },
                })}
              </Text>
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default PriceRangePicker;

const styles = StyleSheet.create({
  tint: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "white",
    opacity: 0.5,
    zIndex: 0,
  },
});
