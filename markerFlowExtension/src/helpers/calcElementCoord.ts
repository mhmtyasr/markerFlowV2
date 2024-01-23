import { ElementData } from "../model/ElementData";

export const calcElementCoord = (
  elementCoord: ElementData,
  parentElementCoord: DOMRect
) => {
 
  return {
    top: parentElementCoord.top + window.scrollY - 47,
    left: parentElementCoord.left + window.scrollX - 23,
    transform: `translate(${
      parentElementCoord.width * elementCoord.coords.xRate
    }px, ${parentElementCoord.height * elementCoord.coords.yRate}px)`,
  };
};
