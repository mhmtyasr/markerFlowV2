
export interface ITopicDto {
  title: string;
  pageUrl: string;
  pageIconUrl: string;
  comment: string;
  id: number;
  element: string| null;
  creatorUserId: number;
  mentionUserIds: number[];
  commentCount: number;
  creationTime: string;
  createUserFullName: string;
}

export interface ICreateTopicDto {
  title: string;
  pageUrl: string;
  pageIconUrl: string;
  comment: string;
  element: string | null;
  mentionUserIds?: number[];
}
