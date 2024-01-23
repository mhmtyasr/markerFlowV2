import { EventEmitter } from "events";
import { ExtensionMessageTypes } from "../../enums/ExtensionMessageTypes";

const eventEmitter = new EventEmitter();

export function removeEvent(
  type: ExtensionMessageTypes,
  callback: (...args: any[]) => void
) {
  eventEmitter.removeListener(type, callback);
}

export function subscribeEvent(
  type: ExtensionMessageTypes,
  callback: (...args: any[]) => void
) {
  eventEmitter.addListener(type, callback);
}

export function onceEvent(
  type: ExtensionMessageTypes,
  callback: (...args: any[]) => void
) {
  eventEmitter.once(type, callback);
}

export function publishEvent(type: ExtensionMessageTypes, ...args: any[]) {
  eventEmitter.emit(type, args);
}
