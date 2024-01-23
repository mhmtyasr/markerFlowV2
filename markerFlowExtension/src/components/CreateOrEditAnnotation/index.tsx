import React, { FC, useEffect, useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import "theroomjs/src/theroom.js";
import { useIframe } from "../../context/IFrameContext";
import { useUI } from "../../context/UIContext";
import usePubSub from "../../hook/pubsub";
import Coord from "../../model/Coord";
import { ElementData } from "../../model/ElementData";
import { ExtensionMessageTypes } from "../../model/enums/ExtensionMessageTypes";
import { IFrameMessageTypes } from "../../model/enums/IFrameMessageTypes";
import Direction from "../../model/enums/SbDirection";
import Card from "../Draw/components/Cards/cardItem";
import NewPin from "./component/NewPin";
import { domElementPath } from "../../helpers/domElementPath";
import { getSelectorPath } from "@dom-utils/selector-path";

interface Props {}

declare global {
  interface Window {
    theRoom: any;
  }
}

const CreateOrEditAnnotation: FC<Props> = () => {
  const updateXarrow = useXarrow();
  const [elementData, setElementData] = useState<ElementData | null>(null);

  const { direction } = useUI();
  const cardRef = useRef(null);
  let pinRef = useRef(null);
  const { eventService } = useIframe();

  const [isCreating, setIsCreating] = usePubSub(
    IFrameMessageTypes.CreateAnnotation,
    false,
    () => {
      window.theRoom.start();
    },
    true,
    [eventService]
  );

  const [cardCoord,setCardCoord] = usePubSub<Coord | any>(
    IFrameMessageTypes.DrawAnnotation,
    null,
    (e: any) => {
      if (e) {
        if (e.commentId === "new" || e.commentId === "newComment") {
          return { x: 40, y: e.commentId === "new" ? 343 : 231 };
        } else {
          //@ts-ignore
          pinRef.current = document.getElementById(e.commentId)!;
          return { x: 40, y: 343 };
        }
      } else {
        return null;
      }
    }
  );

  usePubSub<any>(
    IFrameMessageTypes.DeleteAnnotation,
    null,
    (e: any, param: any) => {
      setElementData(null);
      setCardCoord(null);
    }
  );



  const replaceSelector = (selector: string) => {
    if (selector.includes(".theRoom")) {
      return selector.replace(".theRoom", "");
    } else {
      return selector;
    }
  };

  useEffect(() => {
    window.theRoom.configure({
      blockRedirection: true,
      createInspector: true,
      click: function (element: HTMLElement, event: MouseEvent) {
        if (element.classList.contains("markerFlow-root")) {
          window.theRoom.stop();
          return;
        }
        let x = event.pageX - element.getBoundingClientRect().left;
        let y =
          event.pageY - element.getBoundingClientRect().top - window.scrollY;
        const pinCoordinates: PinCoordinates = {
          x: x,
          y: y,
          width: element.offsetWidth,
          height: element.offsetHeight,
          xRate: x / element.offsetWidth,
          yRate: y / element.offsetHeight,
        };

        let clickedElementPath: string | null = null;
        try {
          clickedElementPath = domElementPath(element);
        } catch (e) {
          clickedElementPath = getSelectorPath(element, {
            rootNode: document.getElementsByTagName("html")[0],
          });
        }

        const pinData: ElementData = {
          selector: clickedElementPath && replaceSelector(clickedElementPath),
          coords: pinCoordinates,
          id: element.id,
          tagName: element.tagName.toLowerCase(),
          textContent: element.textContent,
          outerHTML: element.outerHTML.replace("markerFlow-pointer-none", ""),
        };

        setElementData(pinData);
        window.theRoom.stop();
      },
      started: function () {
        setIsCreating(true);
      },
      stopped: function () {
        setIsCreating(false);
      },
    });
  }, [eventService]);

  useEffect(() => {
    if (elementData) {
      eventService?.postMessage(ExtensionMessageTypes.SelectAnnotationElement, {
        ...elementData,
      });
    }
  }, [elementData]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      updateXarrow();
    });
  }, []);

  return (
    <Xwrapper>
      {cardCoord && (
        <Card
          className="annotationCard"
          coords={
            {
              x:
                direction === Direction.Right
                  ? window.innerWidth - 420 + cardCoord.x
                  : cardCoord.x,
              y: cardCoord.y,
            } as Coord
          }
          id="new"
          cardRef={cardRef}
        ></Card>
      )}

      {elementData && (
        <div>
          <NewPin pinData={elementData} pinRef={pinRef}></NewPin>
        </div>
      )}

      {cardCoord && pinRef.current && (
        <Xarrow
          startAnchor={direction === Direction.Right ? "left" : "right"}
          endAnchor={direction === Direction.Right ? "right" : "left"}
          showXarrow={true}
          start={cardRef}
          end={pinRef}
          zIndex={2147483647}
          animateDrawing={0.1}
          curveness={1}
          color="black"
        />
      )}

      {isCreating && (
        <button className="markerFlow-cancel-button">Cancel</button>
      )}
    </Xwrapper>
  );
};

export default CreateOrEditAnnotation;
