import Cover from "./Cover";
import { ghost, wrap } from "../ui";

// Підбірка: книги з обраного (або перша книга каталогу)
export default function Banner({ book, liked, onOpen }) {
  return (
    <section className={wrap}>
      <div className="flex items-center justify-between gap-4 rounded-3xl bg-[linear-gradient(100deg,#b5c6ad,#dfdcc3_60%,#ece3cb)] p-6 sm:p-10">
        <div>
          <p className="text-[11px] text-wine/80">Підбірка</p>
          <h2 className="text-xl font-bold text-olive sm:text-2xl">Книги, що говорять про важливе</h2>
          <p className="mt-1 max-w-xs text-[11px] text-olive/80">Книги, збережені в обране, — ваша особиста підбірка. Зараз у ній: {liked}.</p>
          <button onClick={onOpen} className={`${ghost} mt-4`}>Дивитися підбірку →</button>
        </div>
        {book && (
          <div className="hidden w-28 shrink-0 rotate-6 shadow-xl sm:block">
            <Cover book={book} />
          </div>
        )}
      </div>
    </section>
  );
}
