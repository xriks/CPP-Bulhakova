// Клієнт REST API bukvarnia-server (Express + MongoDB)
const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api/books";

async function request(path = "", method = "GET", body) {
  const res = await fetch(API + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Помилка сервера");
  return data;
}

// params: { search, genre } — пошук і фільтр виконує сервер у базі даних
export const getBooks = (params = {}) =>
  request("?" + new URLSearchParams(Object.entries(params).filter(([, v]) => v)));
export const createBook = (book) => request("", "POST", book);
export const updateBook = (id, book) => request("/" + id, "PUT", book);
export const deleteBook = (id) => request("/" + id, "DELETE");
