import { IElementData } from "../common/ElementData";

export interface ITopicUI {
    title: string;
    pageUrl: string;
    pageIconUrl: string;
    comment: string;
    id: number;
    element: IElementData | null;
    creatorUserId: number;
    mentionUserIds: number[] | null;
    commentCount: number;
    creationTime: string;
    createUserFullName: string;
  }