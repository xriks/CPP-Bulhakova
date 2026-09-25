import Cover from "./Cover";

export default function BookItem({ book, liked, onOpen, onWish, onCart, onDelete }) {
  return (
    <li className="group relative flex min-w-0 flex-col rounded-xl bg-olive p-1.5 text-bone shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-2">
      <button onClick={() => onOpen(book)} aria-label={`Деталі: ${book.title}`} className="cursor-pointer overflow-hidden rounded-lg">
        <Cover book={book} />
      </button>
      <button onClick={() => onDelete(book)} aria-label={`Видалити: ${book.title}`} title="Видалити книгу"
        className="absolute right-2 top-2 z-10 flex size-5 cursor-pointer items-center justify-center rounded-full bg-black/55 text-[10px] text-white hover:bg-red-700">✕</button>
      <div className="flex flex-1 flex-col gap-1 px-0.5 pb-0.5 pt-2">
        <button onClick={() => onOpen(book)} className="line-clamp-2 min-h-8 cursor-pointer text-left text-[11px] font-semibold leading-tight hover:text-gold sm:text-xs">{book.title}</button>
        <p className="line-clamp-1 text-[9px] text-bone/65 sm:text-[10px]">{book.author}</p>
        <div className="mt-1 flex items-center justify-between gap-1">
          <span className="text-[11px] font-bold text-gold sm:text-xs">{book.price} грн</span>
          <span className={`text-[9px] ${book.stock ? "text-bone/65" : "font-semibold text-red-300"}`}>{book.stock ? `${book.stock} шт.` : "Немає"}</span>
        </div>
        <div className="mt-1 flex items-center gap-1">
          <button onClick={() => onCart(book)} disabled={!book.stock} className="min-w-0 flex-1 cursor-pointer rounded-full bg-bone px-1.5 py-1.5 text-[9px] font-semibold text-olive hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:text-[10px]">До кошика</button>
          <button onClick={() => onWish(book._id)} aria-pressed={liked} aria-label={liked ? "Прибрати з обраного" : "В обране"} title={liked ? "Прибрати з обраного" : "В обране"}
            className={`flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full border text-sm ${liked ? "border-gold bg-gold text-olive" : "border-bone/40 hover:border-bone"}`}>{liked ? "♥" : "♡"}</button>
        </div>
      </div>
    </li>
  );
}
