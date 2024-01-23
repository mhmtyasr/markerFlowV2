import React, { FC, memo, useEffect, useState } from "react";
import findElement from "../../../../helpers/index";
import usePubSub from "../../../../hook/pubsub";
import { IFrameMessageTypes } from "../../../../model/enums/IFrameMessageTypes";
import { PinDto } from "../../../../model/pin.dto";
import Pin from "./pinItem";

import { useIframe } from "../../../../context/IFrameContext";
import { ExtensionMessageTypes } from "../../../../model/enums/ExtensionMessageTypes";
import { useUI } from "../../../../context/UIContext";
import Direction from "../../../../model/enums/SbDirection";
import Xarrow from "react-xarrows";
type Props = {
  pinData: PinDto[];
};

const Pins: FC<Props> = ({ pinData }) => {
  const { eventService } = useIframe();
  const [pins, setPins] = useState<PinDto[]>([]);
  const { pinRefs, cardRefs, direction } = useUI();

  usePubSub(
    IFrameMessageTypes.ScrollTo,
    false,
    (e: any, param: any) => {
      const temp = pinRefs.current.find(
        (x: HTMLElement) => x.id === `markerFlow-pin-${e.commentId}`
      );
      if (temp) {
        temp.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    true,
    []
  );

  const [hoverItemIndex, setHoverIndex] = useState<string | null>(null);


  const loadData = () => {
    const tempUnvisiblePins: PinDto[] = [];
    const tempVisiblePins: PinDto[] = [];
    pinData.map((item) => {
      const element = findElement(item.element);
      if (element) {
        tempVisiblePins.push(item);
      } else {
        tempUnvisiblePins.push(item);
      }
    });

    eventService?.postMessage(ExtensionMessageTypes.NOTFOUNDIDS, {
      ids: tempUnvisiblePins.map((item) => item.id),
    });

    setPins(tempVisiblePins);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 1000);

    return () => clearInterval(interval);
  }, [pinData]);

  const getAnchor = () => {
    return {
      startAnchor: direction === Direction.Right ? "right" : "left",
      endAnchor: direction === Direction.Right ? "left " : "right",
    };
  };

  const getStartRef = () => {
    const temp = pinRefs.current.find(
      (x: HTMLElement) => x.id === `markerFlow-pin-${hoverItemIndex}`
    );
      return { current: temp };
  };

  const getEndRef = () => {
   
    const temp = (cardRefs.current as HTMLElement[]).find(
      (x) => x.id === `markerFlow-card-${hoverItemIndex}`
    );
    return { current: temp };
  };

  return (
    <div className="markerFlow-pins-container">
      {pins.map((item, index: number) => {
        const element = findElement(item.element);

        return (
          <Pin
            id={item.id}
            element={element!}
            elementData={item.element}
            userFullName={item.createUserFullName}
            onMouseEnter={() => setHoverIndex(item.id)}
            onMouseLeave={() => {setHoverIndex(null)}}
            pinRef={(element: any) => {
              pinRefs.current[index] = element;
            }}
          ></Pin>
        );
      })}

      {hoverItemIndex && (
        <Xarrow
          {...(getAnchor() as any)}
          showXarrow={true}
          start={getStartRef()}
          end={getEndRef()}
          zIndex={ 2147483647}
          animateDrawing={0.1}
          curveness={1}
          color="black"
        />
      )}
    </div>
  );
};

// function areEqual(prevProps: any, nextProps: any) {
//   if (
//     prevProps.pinData.length === nextProps.pinData.length ||
//     prevProps.hoverItemIndex === nextProps.hoverItemIndex
//   ) {
//     return true;
//   }
//   return false;
// }

export default Pins;
