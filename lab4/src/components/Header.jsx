import Cover from "./Cover";
import { wine } from "../ui";

export default function Header({ total, liked, inCart, onCart, search, setSearch, onSearch, covers }) {
  return (
    <header>
      <div className="sticky top-0 z-30 flex items-center gap-3 bg-cream/90 px-4 py-2 backdrop-blur sm:px-8">
        <a href="#top" className="text-xs font-bold text-wine">Букварня</a>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Пошук за назвою або автором…"
          aria-label="Пошук книги"
          className="ml-auto h-7 min-w-0 w-full max-w-64 rounded-full border border-khaki bg-white/50 px-3 text-xs outline-none focus:border-wine"
        />
        <button onClick={onCart} className={`${wine} shrink-0 py-1.5 whitespace-nowrap`}>Кошик ({inCart})</button>
      </div>
      <div className="bg-[linear-gradient(100deg,#cdc2a6,#e2dac4_55%,#ece7d5)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-8 sm:px-8 sm:py-12">
          <div>
            <p className="text-[11px] text-wine/80">Книги, що запам'ятаються з тобою</p>
            <h1 className="text-3xl font-bold text-wine sm:text-5xl">Букварня</h1>
            <p className="mt-2 max-w-xs text-xs text-wine italic">Книги, які надихають, заспокоюють і відкривають нові світи</p>
            <p className="mt-3 text-[11px] font-medium text-olive/80">Усього книг: {total} · В обраному: {liked}</p>
            <a href="#catalog" className={`${wine} mt-4 inline-block`}>До каталогу →</a>
          </div>
          <div className="relative hidden h-44 w-60 shrink-0 sm:block">
            {covers.map((b, i) => (
              <div key={b._id} className="absolute w-24 shadow-xl" style={{ left: i * 52, top: (i % 2) * 18, transform: `rotate(${[-8, 4, -3][i]}deg)` }}>
                <Cover book={b} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
