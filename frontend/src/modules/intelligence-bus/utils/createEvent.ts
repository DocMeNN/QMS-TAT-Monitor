// src/modules/intelligence-bus/utils/createEvent.ts

export function createEvent<T>(
  type: string,
  payload: T
) {
  return {
    type,
    payload,
    timestamp:
      new Date().toISOString(),
  };
}