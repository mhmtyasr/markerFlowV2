export interface IPagedResponse<T> {
  items: T[];
  totalCount: number;
}