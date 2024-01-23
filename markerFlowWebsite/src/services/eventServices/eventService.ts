import { ExtensionMessageTypes } from "../../enums/ExtensionMessageTypes";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import { IEventService } from "../../models/common/IEventService";
import { publishEvent } from "./PubSubService";

export default class EventService implements IEventService {
  private static eventService: IEventService | null;

  publishMessage = (message: IFrameMessageTypes, data: any) => {
    window.parent.postMessage({ type: message, data }, "*");
  };

  subscribeMessages = () => {
    window.addEventListener("message", (event) => {
      const key = Object.keys(ExtensionMessageTypes)[
        Object.values(ExtensionMessageTypes).indexOf(event.data.type)
      ];
      if (ExtensionMessageTypes[key as keyof typeof ExtensionMessageTypes]) {
        publishEvent(event.data.type, event.data.data);
      }
    });
  };

  static getEventService(): IEventService {
    if (!this.eventService) this.eventService = new EventService();
    return this.eventService;
  }
}
