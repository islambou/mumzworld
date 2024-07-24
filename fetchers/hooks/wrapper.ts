import { DefaultError, UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

export type Options<P, RR> = Omit<UseQueryOptions<RR>, "queryKey" | "queryFn"> & {
  queryParams: P;
};

type FN<P, R> = (p: P) => R | Promise<R>;
export type AsyncFunInfer<F extends (...args: any) => any> = Awaited<ReturnType<F>>;
export function queryWrapper<RP extends {} | undefined, RR>(quryKey: string, fn: FN<RP, RR>, options: Options<RP, RR>) {
  return useQuery({
    queryKey: [quryKey, options.queryParams],
    queryFn: () => fn(options.queryParams),
    ...options,
  });
}
