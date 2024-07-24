import { getProductsList, getProduct } from "../requests";
import { QUERY_KEYS } from "../queryKeys";
import { FetchProductParams, FetchProductsListParams } from "../dtos";
import { AsyncFunInfer, Options as QueryHookOptions, queryWrapper } from "./wrapper";

export const useProductsListQuery = (options: QueryHookOptions<FetchProductsListParams, AsyncFunInfer<typeof getProductsList>>) =>
  queryWrapper(QUERY_KEYS.PRODUCTS_LIST, getProductsList, options);

export const useProductDetailsQuery = (options: QueryHookOptions<FetchProductParams, AsyncFunInfer<typeof getProduct>>) =>
  queryWrapper(QUERY_KEYS.PRODUCT_DETAILS, getProduct, options);
