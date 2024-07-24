import { FlatList, FlatListProps, View } from "react-native";
import React from "react";
import { FlashListProps } from "@shopify/flash-list";
import { useTheme } from "../../theme/ThemeProvider";
import { useStore } from "../../store/StoreProvider";
import ProductListItemSilhouette from "./ProductListItemSilhouette";

type Props = {
  listViewProps?: FlatListProps<any>;
};

const NUM_COLUMNS = 2;

const ProductsListSilhouette = ({ listViewProps }: Props) => {
  const { commonStyles, size } = useTheme();
  const ITEM_MARGIN = size.unit * 2;

  return (
    <>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: ITEM_MARGIN }} />}
        renderItem={({ item, index }) => (
          <View
            style={[
              {
                marginEnd: index % NUM_COLUMNS ? undefined : ITEM_MARGIN,
                marginStart: index % NUM_COLUMNS ? ITEM_MARGIN : undefined,
              },
              commonStyles.flex,
            ]}
          >
            <ProductListItemSilhouette />
          </View>
        )}
      />
    </>
  );
};

export default ProductsListSilhouette;
