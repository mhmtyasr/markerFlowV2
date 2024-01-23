import { IElementData } from "../common/ElementData";

export interface ICommentUI {
  comment: string;
  element?: IElementData;
  mentionUserIds: number[];
  creatorUserId: number;
  creationTime: string;
  id: number;
  creatorUserName: string;
}

export interface ICreateCommentUIModel {
  body: string;
  url: string;
  element: IElementData | null;
  websiteIcon: string;
  topicId: string;
}
