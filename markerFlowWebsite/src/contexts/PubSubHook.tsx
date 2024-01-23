import { useEffect, useRef, useState } from "react";
import { ExtensionMessageTypes } from "../enums/ExtensionMessageTypes";
import {
  removeEvent,
  subscribeEvent,
} from "../services/eventServices/PubSubService";

export function usePubSub<T>(
  eventName: ExtensionMessageTypes,
  defaultValue: T,
  callback: any = null,
  isSubscribe: boolean = true,
  DependencyList: any[] = []
): [T, Function] {
  const [data, setData] = useState<T>(defaultValue);

  const myStateRef = useRef(data);
  const setMyState = (data: T) => {
    myStateRef.current = data;
    setData(data);
  };

  const handleCallback = (param: any) => {
    if (typeof callback === "function") {
      const tempData = callback(param[0], myStateRef.current);
      if (tempData) {
        setMyState(tempData);
      }
    } else {
      setMyState(param[0]);
    }
  };

  useEffect(() => {
    if (isSubscribe) {
      subscribeEvent(eventName, handleCallback);
    }
    return () => {
      removeEvent(eventName, handleCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, isSubscribe, ...DependencyList]);

  return [data, setData];
}

export default usePubSub;
