import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { publishEvent } from "../helpers/Event";
import { ExtensionMessageTypes } from "../model/enums/ExtensionMessageTypes";
import EventService from "../service/EventService";

export type IframeContextProps = {
  onIFrameLoad: (e: any) => void;
  eventService: EventService | null;
};

let IframeContext = createContext<any>({});

function IframeProvider({ children }: { children: React.ReactNode }) {
  const [eventService, setEventService] = useState<EventService | null>(null);

  const onIFrameLoad = (e: any) => {
    const events = new EventService(e);
    events.publishMessages();

    setEventService(events);

    events.postMessage(ExtensionMessageTypes.PageInfo, {
      url: window.location.href,
      title: document.title,
    });
  };

  useEffect(() => {
    return () => {
      if (eventService) {
        eventService.dispose();
      }
    };
  }, []);

  let value: IframeContextProps = {
    onIFrameLoad,
    eventService,
  };

  return (
    <IframeContext.Provider value={value}>{children}</IframeContext.Provider>
  );
}

const useIframe = (): IframeContextProps => {
  return useContext<IframeContextProps>(IframeContext);
};

export { useIframe, IframeProvider };
