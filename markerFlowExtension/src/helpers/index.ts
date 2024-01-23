import Coord from "../model/Coord";
import { ElementData } from "../model/ElementData";

export const findElementBySelector = (selector: string): Element | null => {
  return document.querySelector(selector);
};

export const findElementById = (id: string): HTMLElement | null => {
  return document.getElementById(id);
};
export const getElementByCoord = (x: number, y: number) => {
  return document.elementFromPoint(x, y);
};

export const findElementByTagName = (
  tagName: string
): HTMLCollectionOf<Element> => {
  return document.getElementsByTagName(tagName);
};

export const findElementByOuterHTML = (
  tagName: string,
  outerHTML: string
): any => {
  var returnElement: any = null;
  var element_list: NodeListOf<Element> = document.querySelectorAll(tagName);
  var element_array = [...element_list];
  element_array.forEach((element) => {
    if (element.outerHTML === outerHTML) {
      returnElement = element;
    }
  });
  return returnElement;
};

export const findElementByTextContext = (
  textContent: string,
  tagName: string
): any => {
  var returnElement: any = null;
  var element_list: NodeListOf<Element> = document.querySelectorAll(tagName);
  var element_array = [...element_list];
  element_array.forEach((element) => {
    if (element.textContent === textContent) {
      returnElement = element;
    }
  });
  return returnElement;
};

function isElementVisible(element: Element) {
  if (!element) return false;

  var rect = element.getBoundingClientRect();

  if (rect.width == 0 || rect.height == 0) return false;

  return true;
}

const findElement = (param: ElementData): DOMRect | null => {
  let element: Element | null = null;
  if (param.id) {
    element = findElementById(param.id);
    if (element && isElementVisible(element))
      return element.getBoundingClientRect();
  }
  if (param.textContent) {
    element = findElementByTextContext(param.textContent, param.tagName);
    if (element) return element?.getBoundingClientRect();
  }
  if (param.selector) {
    element = findElementBySelector(param.selector);
    if (element && isElementVisible(element))
      return element.getBoundingClientRect();
  }
  if (param.outerHTML) {
    element = findElementByOuterHTML(param.tagName, param.outerHTML);
    if (element && isElementVisible(element))
      return element.getBoundingClientRect();
  }

  // if (param.coords) {
  //   element = getElementByCoord(param.coords.x, param.coords.y);
  //   if (element && element.textContent === param.textContent)
  //     return element.getBoundingClientRect();
  // }

  return null;
};

export default findElement;
