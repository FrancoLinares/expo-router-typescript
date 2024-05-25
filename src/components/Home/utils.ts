/* eslint-disable no-prototype-builtins */
import { Match } from 'src/types/match'

/**
 * Checks if the given match object is a valid match by checking if any of its properties are not null.
 *
 * @template T - The type of the match object.
 * @param {T} match - The match object to be checked.
 * @returns {match is Must<T>} - Returns true if the match object is a valid match, false otherwise.
 */
export function isMatch<T extends Match>(match: T): match is Must<T> {
  for (const key in match) {
    if (match.hasOwnProperty(key) && match[key] !== null) {
      return true
    }
  }
  return false
}

export type Must<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}
