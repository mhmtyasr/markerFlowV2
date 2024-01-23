import React, { createContext, useContext, useRef } from "react";
import usePubSub from "../hook/pubsub";
import { IFrameMessageTypes } from "../model/enums/IFrameMessageTypes";
import Direction from "../model/enums/SbDirection";

export type UIContextProps = {
  direction: Direction;
  pinRefs: any;
  cardRefs: any;
};

let UIContext = createContext<any>({});

function UIProvider({ children }: { children: React.ReactNode }) {
  const pinRefs = useRef<any>([]);
  const cardRefs = useRef<any>([]);
  const [direction] = usePubSub<Direction>(
    IFrameMessageTypes.ToggleDirection,
    Direction.Right,
    (e: string, param: any) => {
      if (param === Direction.Right) {
        return Direction.Left; // do something
      }
      return Direction.Right; // do something
    }
  );

  let value: UIContextProps = {
    direction,
    pinRefs,
    cardRefs,
  };

 

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

const useUI = (): UIContextProps => {
  return useContext<UIContextProps>(UIContext);
};

export { useUI, UIProvider };
