import { View, TextInput, ViewProps, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import translate from "../../i18n/translate";
import Button from "../button/Button";
import Octicons from "@expo/vector-icons/Octicons";
import { Props as SearchFormProps } from "./SearchForm";
import { FetchProductsListParams } from "../../fetchers/dtos";
import { SIZE_UNIT } from "../../theme/theme";

const DEBOUNCE_DELAY = 500;

type Props = ViewProps & {
  onFilterChange: (filter: FetchProductsListParams) => void;
  initialFilter?: FetchProductsListParams;
  onFilterButtonPress?: () => void;
  isDirty?: boolean;
  isFormVisible?: boolean;
};
const SearchBar = (props: Props) => {
  const { commonStyles, size, colorPalette } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchText);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    props.onFilterChange({ label: debouncedText });
  }, [debouncedText]);

  return (
    <>
      <View {...props} style={[commonStyles.row, { gap: size.unit * 2 }, props.style]}>
        <View style={[commonStyles.flex, commonStyles.inputBase, commonStyles.bordered, commonStyles.row, commonStyles.center.horizontal]}>
          <TextInput
            style={[commonStyles.flex, { height: "100%" }]}
            value={searchText}
            placeholder={translate("search")}
            placeholderTextColor={colorPalette.textWeak}
            onChangeText={setSearchText}
          />
          {!!searchText && <Button icon="x" onPress={() => setSearchText("")} />}
          {!searchText && <Octicons name="search" size={size.icon1} />}
        </View>
        <View style={{ position: "relative" }}>
          <Button
            icon={props.isFormVisible ? "multi-select" : "three-bars"}
            style={{ height: size.input }}
            onPress={() => {
              props.onFilterButtonPress?.();
            }}
          />
          {props.isDirty && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: colorPalette.primary,
                },
              ]}
            /> // dirty indicator
          )}
        </View>
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: SIZE_UNIT * 3,
    height: SIZE_UNIT * 3,
    borderRadius: SIZE_UNIT * 3,
  },
});
