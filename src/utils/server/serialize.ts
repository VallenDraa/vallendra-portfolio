/* eslint-disable import/prefer-default-export */
/**
 *
 * @param arg any type of argument is okay
 * @returns returns the same value as the argument but it is json serializable
 */

export async function JSONSerialize<T>(arg: T) {
  const temp = JSON.stringify(arg);
  const serialized = JSON.parse(temp);

  return serialized as T;
}
