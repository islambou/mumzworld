import { API_URLS } from "../config";
import axiosInstance from "../utils/axios";
import { FetchProductParams, FetchProductsListParams, ProductDetailsResponse, ProductsListResponse } from "./dtos";

export async function getProductsList(params: FetchProductsListParams) {
  if (!API_URLS.products_list) {
    throw new Error("url unavailable");
  }
  const result = await axiosInstance.get(API_URLS.products_list, { params });
  if (result.data) {
    return result.data as ProductsListResponse;
  }
  return undefined;
}
export async function getProduct(params: FetchProductParams) {
  if (!API_URLS.product_details) {
    throw new Error("url unavailable");
  }
  const result = await axiosInstance.get(API_URLS.product_details, { params });
  if (result.data) {
    return result.data as ProductDetailsResponse;
  }
  return undefined;
}
