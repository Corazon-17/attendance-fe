import type { HttpStatusCode } from "axios";

export type Response<T> = {
  statusCode: HttpStatusCode;
  message: string;
  data: T;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type PaginationData<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type PaginationQueryParams = {
  page: number;
  pageSize: number;
};

export type SortingQueryParams = {
  sortBy?: string;
  sortDir?: "asc" | "desc";
};

export type FilterQueryParams = {
  search?: string;
  field?: string;
};

export type DateFilterQueryParams = {
  from?: string;
  to?: string;
};

export interface BasePaginationQueryParams
  extends PaginationQueryParams, SortingQueryParams, FilterQueryParams {}
