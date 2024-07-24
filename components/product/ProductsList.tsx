import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { ID, TProductsListItem } from "../../fetchers/dtos";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import ProductListItem, { PRODUCT_LIST_ITEM_HEIGHT } from "./ProductListItem";
import { useTheme } from "../../theme/ThemeProvider";
import { useStore } from "../../store/StoreProvider";
import { BlurView } from "expo-blur";
import ProductDetailsSection from "../../sections/product-details/ProductDetails";
import Button from "../button/Button";
import translate from "../../i18n/translate";

type Props = {
  products: TProductsListItem[];
  stickyHeader?: React.ReactElement;
  onItemPress: (id: ID) => void;
  listViewProps?: Omit<FlashListProps<any>, "data" | "renderItem">;
};

const NUM_COLUMNS = 2;

const ProductsList = ({ products, onItemPress, listViewProps, stickyHeader }: Props) => {
  //const { state } = useStore();

  const [isModalVisible, setIsModalVisible] = useState<ID>();
  const { commonStyles, size } = useTheme();
  const ITEM_MARGIN = size.unit * 2;

  const dataToRender = products;
  return (
    <>
      {/** stickyHeaderIndices works with data item, so unfortuanitly we can't rely on it to render the sticky header even if we put it in the
       * items array because we have numColumns prop, which will result in rendering the sticky header in a column
       */}
      {stickyHeader}

      <FlashList
        data={dataToRender}
        estimatedItemSize={PRODUCT_LIST_ITEM_HEIGHT}
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
            <ProductListItem
              data={item as TProductsListItem}
              onPress={() => {
                onItemPress(item.id);
              }}
              onLongPress={() => {
                setIsModalVisible(item.id);
              }}
            />
          </View>
        )}
        {...listViewProps}
        stickyHeaderIndices={undefined}
        ListHeaderComponent={() => (
          <>
            {listViewProps?.ListHeaderComponent}
            <Text style={commonStyles.text.h3}>{translate({ showed_items: { count: dataToRender.length } })}</Text>
          </>
        )}
      />
      <Modal
        visible={!!isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setIsModalVisible(undefined);
        }}
      >
        <BlurView intensity={50} style={styles.blurContainer} experimentalBlurMethod="dimezisBlurView">
          <View style={[styles.modalContainer, commonStyles.br]}>
            {!!isModalVisible && <ProductDetailsSection productId={isModalVisible} galeryHeight={300} />}
          </View>
          <Button
            style={commonStyles.mt2}
            icon="x"
            onPress={() => {
              setIsModalVisible(undefined);
            }}
          />
        </BlurView>
      </Modal>
    </>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "70%",
  },
});
