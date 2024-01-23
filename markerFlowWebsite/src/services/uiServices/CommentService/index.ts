import http from "../../../utils/http";
import { ICommentDto, ICreateCommentDto } from "./types";

export const getComments = (topicId: string): Promise<ICommentDto[]> => {
  return http.get<any, ICommentDto[]>(`/comments`, {
    params: {
      topicId,
    },
  });
};

export const createComment = (
 param:ICreateCommentDto
): Promise<ICommentDto> => {
  return http.post<any, ICommentDto>(`/comments`, param);
};
