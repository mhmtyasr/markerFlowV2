import React, { FC, useEffect, Fragment, useState, useCallback } from "react";
import { ElementData } from "../../../../model/ElementData";
import findElement from "../../../../helpers";
import SvgComponent from "../../../../jsonFile/pin";
import { calcElementCoord } from "../../../../helpers/calcElementCoord";

interface Props {
  pinRef: any;
  pinData: ElementData | null;
}
const NewPin: FC<Props> = ({ pinRef, pinData }) => {
  const [pinCoord, setPinCoord] = useState<DOMRect | null>(null);

  const loadData = () => {
    const tepmElement = findElement(pinData!);
    if (tepmElement) {
      setPinCoord(tepmElement);
    }
    else{
      setPinCoord(null);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 1000);

    if(!pinData){
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [pinData]);

  return pinCoord && pinData ? (
    <div
      ref={pinRef}
      className="newPin"
      style={{
        zIndex: 999999999,
        position: "absolute",
        width: "43px",
        ...calcElementCoord(pinData!, pinCoord!),
      }}
    >
      <SvgComponent  fill="#ff4d4f"/>
    </div>
  ) : null;
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.pinData === nextProps.pinData;
};

export default React.memo(NewPin, areEqual);
