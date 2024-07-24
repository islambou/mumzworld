import { View, Text, Switch, FlatList, ScrollView, Pressable, SectionList } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import translate from "../../i18n/translate";
import Divider from "../Divider";
import PriceRangePicker from "./PriceRangePicker";
import { SIZE_UNIT } from "../../theme/theme";
import MyCheckbox from "../CheckBox";
import { Image } from "expo-image";
import Chip from "../Chip";
import Button from "../button/Button";
import { Currency, FetchProductsListParams } from "../../fetchers/dtos";
import { objectCompare } from "../../utils/objectCompare";
import YallaLogo from "../YallaLogo";
import AsModal from "../HOC/AsModal";
import MultiItemSelector from "./MultiItemSelector";

export type Props = {
  prices: number[];
  categories: string[];
  brands: string[];
  filter?: Partial<FetchProductsListParams>;
  onFilterChange?: (filter: Partial<FetchProductsListParams>) => void;
  onFilterReset?: () => void;
  onFilterSubmit?: (filter: Partial<FetchProductsListParams>) => void;
};
const SearchForm = (props: Props) => {
  const { commonStyles, colorPalette } = useTheme();
  const [filter, setFilter] = useState<Partial<FetchProductsListParams>>({ ...props.filter });
  useEffect(() => {
    setFilter({ ...props.filter });
  }, [props.filter]);
  const handleFilterReset = () => {
    setFilter({});
    props.onFilterReset?.();
  };
  const handleFilterChange = (newFilter: Partial<FetchProductsListParams>) => {
    const updatedFilter = { ...filter, ...newFilter };
    setFilter(updatedFilter);
    props.onFilterChange?.(updatedFilter);
  };

  const isfilterChangedLocally = !objectCompare(filter, props.filter);

  return (
    <>
      <ScrollView overScrollMode="never" style={{ flex: 1 }}>
        <View style={[commonStyles.row, { justifyContent: "space-between" }]}>
          <Text style={[commonStyles.text.h3]}>{translate("filter")}</Text>
          <Pressable onPress={handleFilterReset}>
            <Text style={[commonStyles.text.bold, { color: colorPalette.accent }]}>{translate("reset")}</Text>
          </Pressable>
        </View>
        <Divider />
        <View style={commonStyles.section}>
          <Text style={[commonStyles.text.h3]}>{translate("price_range")}</Text>
          <PriceRangePicker
            values={props.prices}
            currency={Currency.Aed}
            onValueChange={(range) => {
              handleFilterChange({ max_price: range[1], min_price: range[0] });
            }}
          />
        </View>
        <View style={commonStyles.section}>
          <View style={[commonStyles.row, { justifyContent: "space-between" }]}>
            <View style={[commonStyles.row, commonStyles.center.vertical, { gap: 4 }]}>
              <Text style={[commonStyles.text.h3]}>{translate("yalla_delivery")}</Text>
              <YallaLogo />
            </View>
            <Switch
              value={filter.yalla_delivery || false}
              trackColor={{ false: colorPalette.textWeak, true: colorPalette.text }}
              thumbColor={colorPalette.background}
              onValueChange={(value) => {
                handleFilterChange({ yalla_delivery: value });
              }}
            />
          </View>
          <Text style={[commonStyles.text.caption]}>{translate("yalla_delivery_description")}</Text>
        </View>
        <View style={[commonStyles.section]}>
          <View style={[commonStyles.row, { justifyContent: "space-between" }]}>
            <Text style={[commonStyles.text.h3]}>{translate("category")}</Text>
          </View>
          <AsModal title={"category"} style={[commonStyles.bordered, commonStyles.br]}>
            <MultiItemSelector
              variant="chip"
              notScrollable
              values={props.categories}
              selectedValues={filter.categories || []}
              onValuesChange={(values) => handleFilterChange({ categories: values })}
            />
          </AsModal>
        </View>
        <View style={[commonStyles.section]}>
          <View style={[commonStyles.row, { justifyContent: "space-between" }]}>
            <Text style={[commonStyles.text.h3]}>{translate("brand")}</Text>
          </View>
          <AsModal title={"brand"} style={[commonStyles.bordered, commonStyles.br]}>
            <MultiItemSelector
              variant="checkbox"
              values={props.brands}
              selectedValues={filter.brands || []}
              onValuesChange={(values) => handleFilterChange({ brands: values })}
              notScrollable
            />
          </AsModal>
        </View>
      </ScrollView>
      <View style={[{ marginBottom: SIZE_UNIT * 4 }]}>
        <Button
          title={"apply"}
          disabled={!isfilterChangedLocally}
          onPress={() => {
            props.onFilterSubmit?.(filter);
          }}
          accent
        />
      </View>
    </>
  );
};

export default SearchForm;
