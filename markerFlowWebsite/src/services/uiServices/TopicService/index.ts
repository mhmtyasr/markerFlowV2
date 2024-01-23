import http from "../../../utils/http";
import { ICreateTopicDto, ITopicDto } from "./types";

export const createTopic = async (
  topic: ICreateTopicDto
): Promise<ITopicDto> => {
  return await http.post<any, ITopicDto>("/topics", topic);
};

export const getTopics = async (): Promise<ITopicDto[]> => {
  return await http.get<any, ITopicDto[]>(`/topics`);
};

export const updateTopic = async (
  topicId: string,
  data: any
): Promise<ITopicDto> => {
  return await http.put("/topics", { id: topicId, ...data });
};

export const deleteTopic = async (topicId: string): Promise<boolean> => {
  return  http.delete("/topics?id=" + topicId);
};
