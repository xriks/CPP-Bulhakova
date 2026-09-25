import { useState } from "react";

const PALETTE = [
  ["#5b1b26", "#a3523f"],
  ["#3c3a1d", "#7a773f"],
  ["#3f5a49", "#7f9a86"],
  ["#4a5d6b", "#7f95a3"],
  ["#6e5232", "#a98a5f"],
];

// Спочатку показуємо обкладинку з бази (якщо є coverUrl/imageUrl),
// інакше пробуємо знайти обкладинку за назвою через Open Library.
export default function Cover({ book, className = "" }) {
  const [failed, setFailed] = useState(false);
  const title = book?.title || "Книга";
  const paletteIndex = [...title].reduce((sum, char) => sum + char.charCodeAt(0), 0) % PALETTE.length;
  const [dark, light] = PALETTE[paletteIndex];
  const imageUrl =
    book?.coverUrl ||
    book?.cover_url ||
    book?.imageUrl ||
    `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg?default=false`;

  return (
    <div className={`relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#d8d2bf] ${className}`}>
      {!failed ? (
        <img
          src={imageUrl}
          alt={`Обкладинка книги «${title}»`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden p-3 text-left text-white shadow-[inset_5px_0_0_rgba(0,0,0,.2)]"
          style={{
            backgroundColor: dark,
            backgroundImage: `linear-gradient(180deg, ${dark}55, ${dark}ee), url("https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="text-[8px] uppercase tracking-[.16em] opacity-80">{book?.genre || "Книгарня"}</span>
          <div className="border-y border-white/40 py-2">
            <h3 className="text-[clamp(10px,1.4vw,15px)] font-bold leading-tight">{title}</h3>
          </div>
          <span className="text-[9px] leading-tight opacity-90">{book?.author || ""}</span>
        </div>
      )}
    </div>
  );
}
