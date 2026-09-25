import { useState } from "react";
import { input, wine } from "../ui";

export const GENRES = ["Поезія", "Класика", "Антиутопія", "Казка", "Фентезі", "Фантастика", "Детектив", "Історія"];
const EMPTY = { title: "", author: "", publisher: "", genre: GENRES[0], price: "", stock: "", description: "" };

export default function BookForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const field = (key, label, type = "text") => (
    <input className={input} type={type} min={0} value={form[key]} onChange={set(key)} placeholder={label} aria-label={label} />
  );
  const submit = async (e) => {
    e.preventDefault();
    if (await onAdd(form)) setForm(EMPTY);
  };
  const wide = "sm:col-span-2 lg:col-span-3";

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {field("title", "Назва книги")}
      {field("author", "Автор")}
      {field("publisher", "Видавництво")}
      <select className={input} value={form.genre} onChange={set("genre")} aria-label="Жанр">
        {GENRES.map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>
      {field("price", "Ціна, грн", "number")}
      {field("stock", "Кількість, шт.", "number")}
      <textarea className={`${input} ${wide}`} rows={2} value={form.description} onChange={set("description")} placeholder="Короткий опис (необов'язково)" aria-label="Опис" />
      <button type="submit" className={`${wine} ${wide}`}>Додати книгу</button>
    </form>
  );
}
