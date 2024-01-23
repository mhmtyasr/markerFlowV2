import { EventEmitter } from "events";
import { IFrameMessageTypes } from "../model/enums/IFrameMessageTypes";

const eventEmitter = new EventEmitter();

export function removeEvent(
  type: IFrameMessageTypes,
  callback: (...args: any[]) => void
) {
  eventEmitter.removeListener(type, callback);
}

export function subscribeEvent(
  type: IFrameMessageTypes,
  callback: (...args: any[]) => void
) {
  eventEmitter.on(type, callback);
}

export function onceEvent(
  type: IFrameMessageTypes,
  callback: (...args: any[]) => void
) {
  eventEmitter.once(type, callback);
}

export function publishEvent(type: IFrameMessageTypes, ...args: any[]) {
  eventEmitter.emit(type, args);
}
