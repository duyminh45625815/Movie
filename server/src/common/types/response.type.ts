export interface SingleResponse<T> {
  data: T;
  message?: string;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
} 