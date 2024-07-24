import { TProductsListItem, FetchProductsListParams, ID, Currency, StockStatus } from "../fetchers/dtos";
import { Location } from "../types/misc";
import { filterProducts, getBarndsFromProducts, getCategoriesFromProducts, getPricesFromProducts } from "./apiHelpers";

const MOCK_PRODUCT_1: TProductsListItem = {
  id: 1,
  name: "Product 1",
  brand_info: { title: "Brand A" },
  categories: [{ name: "Category 1" }, { name: "Category 2" }],
  price_range: { minimum_price: { final_price: { value: 100, currency: Currency.Usd }, regular_price: { value: 200, currency: Currency.Usd } } },
  base_price_range: { minimum_price: { final_price: { value: 100, currency: Currency.Usd }, regular_price: { value: 200, currency: Currency.Usd } } },
  usd_price_range: { minimum_price: { final_price: { value: 100, currency: Currency.Usd } } },
  brand: 1,
  is_yalla: [Location.AE],
  low_stock_qty: null,
  price: { regularPrice: { amount: { value: 100, currency: Currency.Usd } } },
  product_label: {
    active_from: "",
    active_to: "",
    background_color: "",
    label_id: null,
    label_text: "",
    name: "",
    text_color: "",
  },
  sku: "",
  small_image: { url: "" },
  stock_status: StockStatus.InStock,
  type_id: "simple",
  uid: "",
  url_key: "",
  url_suffix: "",
};
const MOCK_PRODUCT_2: TProductsListItem = {
  id: 2,
  name: "Product 2",
  brand_info: { title: "Brand B" },
  categories: [{ name: "Category 1" }],
  price_range: { minimum_price: { final_price: { value: 600, currency: Currency.Usd }, regular_price: { value: 600, currency: Currency.Usd } } },
  base_price_range: { minimum_price: { final_price: { value: 600, currency: Currency.Usd }, regular_price: { value: 600, currency: Currency.Usd } } },
  usd_price_range: { minimum_price: { final_price: { value: 600, currency: Currency.Usd } } },
  brand: 2,
  is_yalla: [Location.AE],
  low_stock_qty: null,
  price: { regularPrice: { amount: { value: 200, currency: Currency.Usd } } },
  product_label: {
    active_from: "",
    active_to: "",
    background_color: "",
    label_id: null,
    label_text: "",
    name: "",
    text_color: "",
  },
  sku: "",
  small_image: { url: "" },
  stock_status: StockStatus.InStock,
  type_id: "simple",
  uid: "",
  url_key: "",
  url_suffix: "",
};
const MOCK_PRODUCT_3: TProductsListItem = {
  id: 3,
  name: "Product 3",
  brand_info: { title: "Brand A" },
  categories: [{ name: "Category 3" }],
  price_range: { minimum_price: { final_price: { value: 700, currency: Currency.Usd }, regular_price: { value: 700, currency: Currency.Usd } } },
  base_price_range: { minimum_price: { final_price: { value: 700, currency: Currency.Usd }, regular_price: { value: 700, currency: Currency.Usd } } },
  usd_price_range: { minimum_price: { final_price: { value: 700, currency: Currency.Usd } } },
  brand: 3,
  is_yalla: [Location.AE],
  low_stock_qty: null,
  price: { regularPrice: { amount: { value: 700, currency: Currency.Usd } } },
  product_label: {
    active_from: "",
    active_to: "",
    background_color: "",
    label_id: null,
    label_text: "",
    name: "",
    text_color: "",
  },
  sku: "",
  small_image: { url: "" },
  stock_status: StockStatus.InStock,
  type_id: "simple",
  uid: "",
  url_key: "",
  url_suffix: "",
};
const products: TProductsListItem[] = [MOCK_PRODUCT_1, MOCK_PRODUCT_2, MOCK_PRODUCT_3];

const userWishList: ID[] = [1, 3];
const userLocation: Location = Location.AE;

describe("Product Utility Functions", () => {
  test("getBarndsFromProducts should return unique brand titles", () => {
    const result = getBarndsFromProducts(products);
    expect(result).toEqual(["Brand A", "Brand B"]);
  });

  test("getCategoriesFromProducts should return unique category names", () => {
    const result = getCategoriesFromProducts(products);
    expect(result).toEqual(["Category 1", "Category 2", "Category 3"]);
  });

  test("getPricesFromProducts should return an array of prices", () => {
    const result = getPricesFromProducts(products);
    expect(result).toEqual([100, 200, 150]);
  });

  test("filterProducts should filter products based on provided filter params", () => {
    const filter: Partial<FetchProductsListParams> = {
      label: "Product",
      is_in_wishlist: true,
      categories: ["Category 1"],
      brands: ["Brand A"],
      min_price: 50,
      max_price: 200,
      yalla_delivery: true,
    };

    const result = filterProducts(products, filter, userLocation, userWishList);
    expect(result).toEqual([MOCK_PRODUCT_1]);
  });
});
