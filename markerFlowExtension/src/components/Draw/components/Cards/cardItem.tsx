import React, { FC } from "react";
import Coord from "../../../../model/Coord";
interface Props {
  cardRef: any;
  coords: Coord;
  className: string;
  id: string;
}
const CardItem: FC<Props> = ({ cardRef, coords, className, id }) => {
  return (
    <>
      <div
        id={`markerFlow-card-${id}`}
        ref={cardRef}
        className={className}
        style={{
          top: coords.y,
          left: coords.x,
        }}
      ></div>
    </>
  );
};

export default CardItem;
