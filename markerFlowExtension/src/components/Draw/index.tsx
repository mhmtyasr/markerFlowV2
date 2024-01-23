import React, { FC, useEffect, useRef, useState } from "react";
import usePubSub from "../../hook/pubsub";
import { IFrameMessageTypes } from "../../model/enums/IFrameMessageTypes";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Pins from "./components/Pins";
import Cards from "./components/Cards";
import Direction from "../../model/enums/SbDirection";
import { useUI } from "../../context/UIContext";
import { DrawLineDto } from "../../model/drawLine.dto";
import { PinDto } from "../../model/pin.dto";

interface Props {}

interface PinsVisiblity {
  commentId: string;
  isVisible: boolean;
}

const Draw: FC<Props> = () => {
 

  const [pinsData, setPinsData] = usePubSub<PinDto[]>(
    IFrameMessageTypes.PinData,
    [],
    (e: string, param: any) => {
      return e;
    }
  );

  const [cardData] = usePubSub<DrawLineDto[]>(
    IFrameMessageTypes.CardData,
    [],
    (e: string, param: any) => {
      return e;
    }
  );

  usePubSub<any>(
    IFrameMessageTypes.DeleteAnnotation,
    null,
    (e: any) => {
      if (e.commentId !== "new") {
        const tempPins = pinsData.filter(
          (item) => item.id !== e.commentId
        );
        setPinsData(tempPins);
      }
    }
  );

  return (
    <Xwrapper>
      <div style={{  zIndex: 2147483647 }}>
        <Pins pinData={pinsData}></Pins>
        <Cards cardData={cardData} ></Cards>
      </div>
    </Xwrapper>
  );
};

export default Draw;
