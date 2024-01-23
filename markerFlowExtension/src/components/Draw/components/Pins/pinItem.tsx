import React, { FC } from "react";
import { ElementData } from "../../../../model/ElementData";
import { calcElementCoord } from "../../../../helpers/calcElementCoord";

interface PinItemProps {
  id: string;
  userFullName: string;
  elementData: ElementData;
  element: DOMRect;
  pinRef: any;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
const boxStyle = {
  borderRadius: "50%",
  height: "40px",
};

const Pin: FC<PinItemProps> = ({
  id,
  userFullName,
  elementData,
  element,
  onMouseEnter,
  onMouseLeave,
  pinRef,
}) => {
  return (
    <>
      <div
        id={`markerFlow-pin-${id}`}
        ref={pinRef}
        className="markerFlow-avatar"
        style={{
          fontSize: "38px",
          position: "absolute",
          backgroundColor: "red",
          zIndex: 999999999,
          width: "43px",
          ...calcElementCoord(elementData, element),
          ...boxStyle,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          width="512px"
          height="512px"
          viewBox="0 0 512 512"
          enableBackground="new 0 0 512 512"
        >
          <path d="M256,0C149.969,0,64,85.969,64,192s160,320,192,320s192-213.969,192-320S362.031,0,256,0z M256,320  c-70.594,0-128-57.438-128-128S185.406,64,256,64s128,57.438,128,128S326.594,320,256,320z" />
        </svg>
      </div>
    </>
  );
};

export default Pin;
