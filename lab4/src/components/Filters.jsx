export const WISH = "__wish";

// Категорії (плитки) — вибір жанру; запит до бази даних надсилається в App
export default function Filters({ genre, setGenre, books, liked, onReset }) {
  const genres = [...new Set(books.map((b) => b.genre))];
  const tiles = [
    ["", "Усі книги", books.length],
    ...genres.map((g) => [g, g, books.filter((b) => b.genre === g).length]),
    [WISH, "♥ Обране", liked],
  ];
  return (
    <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tiles.map(([value, name, n]) => (
          <button
            key={value}
            onClick={() => setGenre(value)}
            aria-pressed={genre === value}
            className={`flex h-20 cursor-pointer flex-col justify-end rounded-xl p-3 text-left transition ${genre === value ? "bg-wine text-bone" : "bg-khaki text-olive hover:bg-khaki/70"}`}
          >
            <span className="text-sm font-semibold">{name}</span>
            <span className="text-[11px] opacity-70">{n} кн.</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-end gap-2 rounded-xl bg-[linear-gradient(160deg,#a8b8b2,#667d88)] p-4 text-white">
        <h3 className="text-base leading-snug font-bold">Відкривайте щось нове для себе</h3>
        <p className="text-[11px] opacity-90">Шукайте за жанром, автором або назвою — пошук виконується в базі даних.</p>
        <button onClick={onReset} className="cursor-pointer self-start rounded-full border border-white/70 px-3 py-1 text-[11px] hover:bg-white/15">
          Скинути фільтри →
        </button>
      </div>
    </div>
  );
}
