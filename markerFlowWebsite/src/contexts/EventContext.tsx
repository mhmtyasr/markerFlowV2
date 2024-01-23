import { createContext, useContext, useEffect, useState } from "react";
import { IEventService } from "../models/common/IEventService";
import EventService from "../services/eventServices/eventService";

export type EventServiceType = {
  eventService: IEventService | null;
};

let EventContext = createContext<EventServiceType>(null!);

const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [eventService, setEventService] = useState<IEventService | null>(null);

  useEffect(() => {
    const events = EventService.getEventService();
    events.subscribeMessages();
    setEventService(events);
  }, []);

  let value: EventServiceType = { eventService };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

const useEvent = (): EventServiceType => {
  return useContext<EventServiceType>(EventContext);
};

export { useEvent, EventProvider };
