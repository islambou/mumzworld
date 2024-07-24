import { FetchProductsListParams, ID, TProductsListItem } from "../fetchers/dtos";
import { Location } from "../types/misc";

export function getBarndsFromProducts(products: TProductsListItem[]): string[] {
  const brands = products.reduce((acc, product) => {
    if (product.brand_info) {
      acc.push(product.brand_info.title);
    }
    return acc;
  }, [] as string[]);
  return Array.from(new Set(brands));
}

export function getCategoriesFromProducts(products: TProductsListItem[]): string[] {
  const categories = products.flatMap((product) => product.categories.map((category) => category.name));
  return Array.from(new Set(categories));
}

export function getPricesFromProducts(products: TProductsListItem[]): number[] {
  const prices = products.map((product) => product.price_range.minimum_price.final_price.value);
  return prices;
}

export function filterProducts(
  products: TProductsListItem[],
  filter: Partial<FetchProductsListParams>,
  userLocation: Location,
  userWishList: ID[]
): TProductsListItem[] {
  let filteredProducts = products;
  if (filter.label) {
    filteredProducts = filteredProducts.filter((product) => product.name.includes(filter.label!));
  }
  if (filter.is_in_wishlist) {
    filteredProducts = filteredProducts.filter((product) => userWishList.includes(product.id));
  }
  if (filter.categories?.length) {
    filteredProducts = filteredProducts.filter((product) => {
      return filter.categories?.some((category) => product.categories.map((category) => category.name).includes(category));
    });
  }
  if (filter.brands?.length) {
    filteredProducts = filteredProducts.filter((product) => product.brand_info && filter.brands?.includes(product.brand_info.title));
  }
  if (filter.max_price !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price_range.minimum_price.final_price.value <= filter.max_price!);
  }
  if (filter.min_price !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price_range.minimum_price.final_price.value >= filter.min_price!);
  }
  if (filter.yalla_delivery !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.is_yalla.includes(userLocation));
  }
  return filteredProducts;
}
