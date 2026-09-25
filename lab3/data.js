export const users = [];
export const books = [];

let nextUserId = 1;
let nextBookId = 1;

export function getNextUserId() {
  return String(nextUserId++);
}

export function getNextBookId() {
  return String(nextBookId++);
}
