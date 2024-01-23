
export interface ICommentDto {
  comment: string;
  element?: string;
  mentionUserIds: number[];
  creatorUserId: number;
  creationTime: string;
  id: number;
  creatorUserName: string;
}

export interface ICreateCommentDto {
  comment: string;
  element: string | null;
  mentionUserIds?: number[];
  topicId: number;
}
