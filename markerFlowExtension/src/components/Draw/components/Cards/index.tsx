import React, { FC, useEffect } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import { useUI } from "../../../../context/UIContext";
import usePubSub from "../../../../hook/pubsub";
import Coord from "../../../../model/Coord";
import { DrawLineDto } from "../../../../model/drawLine.dto";
import { IFrameMessageTypes } from "../../../../model/enums/IFrameMessageTypes";
import Direction from "../../../../model/enums/SbDirection";
import CardItem from "./cardItem";

interface Props {
  cardData: DrawLineDto[];
}

const Cards: FC<Props> = ({ cardData }) => {
  const { direction, cardRefs, pinRefs } = useUI();
  const updateXarrow = useXarrow();

  const getAnchor = () => {
    return {
      startAnchor: direction === Direction.Right ? "left" : "right",
      endAnchor: direction === Direction.Right ? "right" : "left",
    };
  };

  const [hoverItemIndex] = usePubSub<string | null>(
    IFrameMessageTypes.DrawLine,
    null,
    (e: any) => {
      return e.commentId;
    }
  );


  useEffect(() => {
    window.addEventListener("scroll", () => {
      updateXarrow();
    });
    return () => {
      window.removeEventListener("scroll", () => {
        updateXarrow();
      });
    };
  }, []);

  const getStartRef = () => {
    const temp =
      cardRefs.current[
        cardData.findIndex((x) => x.commentId === hoverItemIndex)
      ];
    return {current:temp};
  };

  const getEndRef = () => {
    const temp = pinRefs.current.find(
      (x: HTMLElement) => x.id === `markerFlow-pin-${hoverItemIndex}`
    );
    if(temp){
      return {current:temp};
    }
    return null;
  };

  return (
    <div className="markerFlow-cards-container">
      {cardData.map((item, index: number) => {
        return (
          <CardItem
            className="virtualCard"
            coords={
              {
                x: direction === Direction.Right ? window.innerWidth - 406 : 28,
                y: item.cardLocation.y + 15,
              } as Coord
            }
            id={item.commentId}
            cardRef={(element: any) => {
              cardRefs.current[index] = element;
            }}
          ></CardItem>
        );
      })}
      {hoverItemIndex && (
        <Xarrow
          {...(getAnchor() as any)}
          showXarrow={getEndRef() !== null}
          start={getStartRef()}
          end={getEndRef()}
          zIndex={2147483647}
          animateDrawing={0.1}
          curveness={1}
          color="black"
        />
      )}
    </div>
  );
};

export default Cards;
