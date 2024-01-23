import { publishEvent, removeEvent } from "../helpers/Event";
import { ExtensionMessageTypes } from "../model/enums/ExtensionMessageTypes";
import { IFrameMessageTypes } from "../model/enums/IFrameMessageTypes";

export interface IEventService {
  postMessage: (message: any, data: any) => void;
  publishMessages: () => void;
}

export default class EventService implements IEventService {
  private iframe: any | null = null;

  constructor(_iframe: any) {
    this.iframe = _iframe;
  
  }
  postMessage = (message: ExtensionMessageTypes, data: any) => {
    console.warn("[EXTENSION] MESSAGE SENT", message, data);
    this.iframe?.target?.contentWindow?.postMessage(
      { type: message, data },
      "*"
    );
  };

  publishMessages = () => {
    window.addEventListener("message", (event) => {
      
      const key =
        Object.keys(IFrameMessageTypes)[
          Object.values(IFrameMessageTypes).indexOf(event.data.type)
        ];

      if (IFrameMessageTypes[key as keyof typeof IFrameMessageTypes]) {
        console.warn("[EXTENSION] MESSAGE RECEIVED", event.data,event.data.type);
        publishEvent(event.data.type, event.data.data);
      }
    });
  };

  dispose = () => {
    window.removeEventListener("message", (event) => {
      console.error("[EXTENSION] DISPOSE EVENTS");
    });
  };
}
