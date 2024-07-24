import { Location } from "../types/misc";

export type ID = number;
export type FetchProductsListParams = {
  label?: string;
  yalla_delivery?: boolean;
  categories?: string[];
  brands?: string[];
  is_in_wishlist?: boolean;
  min_price?: number;
  max_price?: number;
  page?: number;
  limit?: number;
};
export type FetchProductParams = { productId: ID };

// generated with https://app.quicktype.io/
export interface ProductsListResponse {
  data: ProductsListPayloadData;
}

export interface ProductsListPayloadData {
  products: ProductsListPayload;
}

export interface ProductsListPayload {
  items: TProductsListItem[];
  page_info: PageInfo;
  total_count: number;
  yalla_total_count: number;
}

export interface TProductsListItem {
  brand: number;
  brand_info: BrandInfo | null;
  categories: Category[];
  id: number;
  is_yalla: Location[];
  low_stock_qty: null;
  name: string;
  price: Price;
  price_range: PriceRange;
  base_price_range: PriceRange;
  usd_price_range: UsdPriceRange;
  product_label: ProductLabel;
  sku: string;
  small_image: SmallImage;
  stock_status: StockStatus;
  type_id: string;
  uid: string;
  url_key: string;
  url_suffix: string;
}

export enum ItemTypename {
  ConfigurableProduct = "ConfigurableProduct",
  SimpleProduct = "SimpleProduct",
}

export enum Currency {
  Aed = "AED",
  Usd = "USD",
}

export interface BrandInfo {
  title: string;
}

export interface Category {
  name: string;
}

export interface Price {
  regularPrice: RegularPrice;
}

export enum PriceTypename {
  ProductPrices = "ProductPrices",
}

export interface RegularPrice {
  amount: FinalPrice;
}

export enum RegularPriceTypename {
  Price = "Price",
}

export interface ProductLabel {
  active_from: string;
  active_to: string;
  background_color: string;
  label_id: number | null;
  label_text: string;
  name: string;
  text_color: string;
}

export enum ProductLabelTypename {
  ProductLabel = "ProductLabel",
}

export enum BackgroundColor {
  D4F4E3 = "#d4f4e3",
  Empty = "",
  Ffe5Ee = "#ffe5ee",
}

export enum LabelText {
  Empty = "",
  Exclusive = "Exclusive",
  MumzChoice = "Mumz Choice",
}

export enum TextColor {
  Empty = "",
  The0B0B0B = "#0b0b0b",
  The43454C = "#43454c",
}

export interface SmallImage {
  url: string;
}

export enum SmallImageTypename {
  ProductImage = "ProductImage",
}

export enum StockStatus {
  InStock = "IN_STOCK",
}

export interface UsdPriceRange {
  minimum_price: UsdPriceRangeMinimumPrice;
}

export interface UsdPriceRangeMinimumPrice {
  final_price: FinalPrice;
}

export interface PageInfo {
  total_pages: number;
}
//--------------------------------------------------------------------
export interface ProductDetailsResponse {
  data: ProductDetailsPayload;
}

export interface ProductDetailsPayload {
  product: ProductDetailedData[];
}

export interface ProductDetailedData {
  language: string;
  redirect_code: number;
  relative_url: string;
  type: string;
  amrma_default_resolution_period: number;
  brand: number;
  brand_info: BrandInfoDetailed;
  categories: CategoryFull[];
  cautions: string;
  cross_border_product: CrossBorderProduct;
  description: Description;
  dimensions: string;
  features: string;
  id: number;
  is_yalla: any[];
  media_gallery: MediaGallery[];
  media_gallery_entries: MediaGalleryEntry[];
  meta_description: string;
  meta_title: string;
  name: string;
  pkgdimensions: string;
  price: Price;
  price_range: PriceRange;
  base_price_range: PriceRange;
  usd_price_range: UsdPriceRange;
  product_label: ProductLabel;
  rating_summary: number;
  recom_age: string;
  review_count: number;
  reviews: Reviews;
  shipping_weight: null;
  sku: string;
  small_image: SmallImage;
  stock_status: string;
  uid: string;
  url_key: string;
  weight: number;

  options: null;
}

export interface PriceRange {
  minimum_price: BasePriceRangeMinimumPrice;
}

export interface BasePriceRangeMinimumPrice {
  final_price: FinalPrice;
  regular_price: FinalPrice;

  discount?: Discount;
}

export interface Discount {
  amount_off: number;
  percent_off: number;
}

export interface FinalPrice {
  currency: Currency;
  value: number;
}

export enum FinalPriceTypename {
  Money = "Money",
}

export interface BrandInfoDetailed {
  img_src: string;
  title: string;
  url: string;
}

export interface CategoryFull {
  breadcrumbs: Breadcrumb[] | null;
  level: number;
  id: number;
  name: string;
  url_path: string;
  url_key: string;
}

export interface Breadcrumb {
  category_id: number;
  category_name: string;
  category_url_key: string;
  category_url_path: string;
}

export interface CrossBorderProduct {
  is_allowed: boolean;
  disallow_countries: string;
}

export interface Description {
  html: string;
}

export interface MediaGallery {
  disabled: boolean;
  label: null;
  position: number;
  url: string;
}

export enum MediaGalleryTypename {
  ProductImage = "ProductImage",
}

export interface MediaGalleryEntry {
  disabled: boolean;
  file: string;
  id: number;
  label: null;
  position: number;
  uid: string;
}

export enum MediaGalleryEntryTypename {
  MediaGalleryEntry = "MediaGalleryEntry",
}

export interface Price {
  regularPrice: RegularPrice;
}

export interface RegularPrice {
  amount: FinalPrice;
}

export interface Reviews {
  items: any[];
  page_info: PageInfo;
}

export interface PageInfo {
  page_size: number;
  total_pages: number;
}

export interface SmallImage {
  url: string;
}

export interface UsdPriceRange {
  minimum_price: UsdPriceRangeMinimumPrice;
}

export interface UsdPriceRangeMinimumPrice {
  final_price: FinalPrice;
}
