import { View, Text, FlatList, ViewProps, ScrollView, FlatListProps } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { SIZE_UNIT } from "../../theme/theme";
import Chip from "../Chip";
import MyCheckbox from "../CheckBox";

type Props = ViewProps & {
  values: string[];
  selectedValues?: string[];
  onValuesChange?: (values: string[]) => void;
  notScrollable?: boolean;
  variant: "chip" | "checkbox";
  row?: boolean;
  flatListProps?: Omit<FlatListProps<any>, "data" | "renderItem">;
};
const MultiItemSelector = (props: Props) => {
  const { commonStyles, colorPalette } = useTheme();
  const handlePress = (value: string) => {
    let data: string[] = [];
    if (props.selectedValues?.includes(value)) {
      data = props.selectedValues?.filter((c) => c !== value) || [];
    } else {
      data = [...(props.selectedValues || []), value];
    }
    props.onValuesChange?.(data);
  };
  const ItemsChips = props.values.map((value, index) =>
    props.variant === "chip" ? (
      <Chip
        label={value}
        key={value + index}
        onPress={() => {
          handlePress(value);
        }}
        active={props.selectedValues?.includes(value)}
      />
    ) : (
      <View style={[{ gap: SIZE_UNIT, width: "45%" }, commonStyles.row]}>
        <MyCheckbox
          key={value + index}
          value={props.selectedValues?.includes(value) || false}
          onValueChange={() => {
            handlePress(value);
          }}
        />
        <Text>{value}</Text>
      </View>
    )
  );
  if (props.notScrollable) {
    return (
      <View {...props} style={[props.style]}>
        <View style={[commonStyles.p2, commonStyles.row, { flexWrap: "wrap", gap: SIZE_UNIT }]}>{ItemsChips}</View>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={[{ backgroundColor: colorPalette.background }]}
        horizontal={props.row}
        data={ItemsChips}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => item}
        {...props.flatListProps}
      />
    </View>
  );
};

export default MultiItemSelector;
