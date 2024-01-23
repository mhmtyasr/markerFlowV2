// @ts-nocheck
var parentElements = function parentElements(element) {
  var parents = [];

  while (element) {
    var tagName = element.nodeName.toLowerCase();
    var cssId = element.id ? "#".concat(element.id) : '';
    var cssClass = '';

    if (element.className && typeof element.className === 'string') {
      // escape class names
      cssClass = ".".concat(element.className.replace(/\s+/g, '.').replace(/[:*+?^${}()|[\]\\]/gi, '\\$&'));
    }

    parents.unshift({
      element: element,
      selector: tagName + cssId + cssClass
    });
    element = element.parentNode !== document ? element.parentNode : false;
  }

  return parents;
};

var nthElement = function nthElement(element) {
  var sameType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var c = element;
  var nth = 1;

  while (c.previousElementSibling !== null) {
    if (!sameType || c.previousElementSibling.nodeName === element.nodeName) {
      nth++;
    }

    c = c.previousElementSibling;
  }

  return nth;
};

var nthSelectorNeeded = function nthSelectorNeeded(selector, path) {
  var querySelector = path === '' ? selector : "".concat(path, " > ").concat(selector);
  return document.querySelectorAll(querySelector).length > 1;
};
var buildPathString = function buildPathString(parents) {
  var pathArr = [];
  parents.forEach(function (parent) {
    if( parent.selector.charAt(parent.selector.length-1)=== "." ){
      parent.selector =parent.selector.slice(0, -1);
    }
    if (nthSelectorNeeded(parent.selector, pathArr.join(' > '))) {
      parent.selector += ":nth-of-type(".concat(nthElement(parent.element), ")");
    }

    pathArr.push(parent.selector);
  });
  return pathArr.join(' > ');
};
//@ts-ignore
export const  domElementPath = function domElementPath(element) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('element must be of type `HTMLElement`.');
  }

  return buildPathString(parentElements(element));
};
