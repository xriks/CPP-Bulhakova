import Cover from "./Cover";
import { dark, ghost, useEsc } from "../ui";

export default function BookModal({ book, liked, onClose, onCart, onWish }) {
  useEsc(onClose);
  const row = (label, value) => (
    <p className="text-sm">
      <b>{label}:</b> <span className="text-olive/70">{value}</span>
    </p>
  );
  return (
    <div onClick={onClose} className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-black/50 p-4">
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" className="flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-bone shadow-xl sm:flex-row">
        <div className="w-full sm:w-56 sm:shrink-0">
          <Cover book={book} />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h2 className="text-xl font-bold text-wine">{book.title}</h2>
          {row("Автор", book.author)}
          {row("Видавництво", book.publisher)}
          {row("Жанр", book.genre)}
          {row("В наявності", `${book.stock} шт.`)}
          <p className="text-sm text-olive/70">{book.description || "Опис відсутній."}</p>
          <p className="text-2xl font-bold text-wine">{book.price} грн</p>
          <div className="mt-auto flex flex-wrap gap-2">
            <button onClick={() => onCart(book)} disabled={!book.stock} className={dark}>До кошика</button>
            <button onClick={() => onWish(book._id)} className={ghost}>{liked ? "♥ В обраному" : "♡ В обране"}</button>
            <button onClick={onClose} className={`${ghost} ml-auto`}>Закрити</button>
          </div>
        </div>
      </div>
    </div>
  );
}
