import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";

export interface IEventService {
  publishMessage: (message: IFrameMessageTypes, data: any) => void;
  subscribeMessages: () => void;
}
