import { useEffect, useState } from "react";
import * as api from "./api";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Filters, { WISH } from "./components/Filters";
import BookForm from "./components/BookForm";
import BookModal from "./components/BookModal";
import Cart from "./components/Cart";
import Banner from "./components/Banner";
import { card, h2, label, wrap } from "./ui";

const STORAGE_KEY = "bukvarnia";

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}
const saved = loadSaved();

export default function App() {
  const [books, setBooks] = useState(saved.books ?? []); // кеш усіх книг з БД
  const [wish, setWish] = useState(saved.wish ?? []); // id обраних книг
  const [cart, setCart] = useState(saved.cart ?? {}); // { id: кількість }
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [found, setFound] = useState(null); // результат пошуку в БД
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const notify = (text, type = "success") => setMessage({ text, type });
  const fail = (e) => notify(e instanceof TypeError ? "Сервер недоступний. Запустіть API на порту 3000." : e.message, "error");
  const refresh = () => api.getBooks().then(setBooks).catch(fail);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ books, wish, cart }));
  }, [books, wish, cart]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(t);
  }, [message]);

  // Пошук / категорія — запит до бази даних (GET /api/books?search=&genre=)
  useEffect(() => {
    if (!search && !genre) return setFound(null);
    const t = setTimeout(() => {
      api
        .getBooks({ search, genre: genre === WISH ? "" : genre })
        .then((r) => setFound(genre === WISH ? r.filter((b) => wish.includes(b._id)) : r))
        .catch(fail);
    }, 300);
    return () => clearTimeout(t);
  }, [search, genre, books, wish]);

  const addBook = async (f) => {
    const price = Number(f.price);
    const stock = Number(f.stock);
    if (![f.title, f.author, f.publisher].every((v) => v.trim())) return notify("Заповніть назву, автора та видавництво.", "error"), false;
    if (f.price === "" || price < 0 || f.stock === "" || !Number.isInteger(stock) || stock < 0)
      return notify("Вкажіть коректну ціну та кількість (ціле число ≥ 0).", "error"), false;
    try {
      const book = await api.createBook({ ...f, price, stock });
      setBooks([book, ...books]);
      notify("Книгу додано.");
      return true;
    } catch (e) {
      fail(e);
      return false;
    }
  };

  const removeBook = async ({ _id, title }) => {
    if (!confirm(`Видалити «${title}»?`)) return;
    try {
      await api.deleteBook(_id);
      setBooks(books.filter((b) => b._id !== _id));
      setWish(wish.filter((id) => id !== _id));
      setCart(Object.fromEntries(Object.entries(cart).filter(([id]) => id !== _id)));
      setSelected(null);
      notify("Книгу видалено.");
    } catch (e) {
      fail(e);
    }
  };

  const toggleWish = (id) => setWish(wish.includes(id) ? wish.filter((x) => x !== id) : [...wish, id]);

  const changeQty = (book, d) => {
    const qty = (cart[book._id] ?? 0) + d;
    if (qty > book.stock) return notify("Більше немає в наявності.", "error");
    const next = { ...cart, [book._id]: qty };
    if (qty <= 0) delete next[book._id];
    setCart(next);
    if (d > 0) notify("Додано до кошика.");
  };

  const items = books.filter((b) => cart[b._id]).map((b) => ({ ...b, qty: cart[b._id] }));

  const checkout = async () => {
    try {
      await Promise.all(items.map(({ qty, ...b }) => api.updateBook(b._id, { ...b, stock: b.stock - qty })));
      setCart({});
      setCartOpen(false);
      await refresh();
      notify("Дякуємо! Замовлення оформлено.");
    } catch (e) {
      fail(e);
    }
  };

  const actions = { wish, onOpen: setSelected, onWish: toggleWish, onCart: (b) => changeQty(b, 1), onDelete: removeBook };
  const liked = wish.filter((id) => books.some((b) => b._id === id)).length;
  const inCart = items.reduce((s, b) => s + b.qty, 0);

  const toResults = () => document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
  const reset = () => (setSearch(""), setGenre(""));
  const picked = books.filter((b) => wish.includes(b._id));

  return (
    <div id="top" className="min-h-screen bg-cream font-sans text-olive">
      <Header total={books.length} liked={liked} inCart={inCart} onCart={() => setCartOpen(true)} search={search} setSearch={setSearch} onSearch={toResults} covers={books.slice(0, 3)} />

      {message && (
        <p role="status" className={`fixed top-14 left-1/2 z-50 w-max max-w-[92vw] -translate-x-1/2 rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-lg ${message.type === "error" ? "bg-red-700" : "bg-olive"}`}>
          {message.text}
        </p>
      )}

      <main className="space-y-10 pb-10">
        <section id="catalog" className={`${wrap} scroll-mt-12 pt-7`}>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className={label}>Для Вас</p>
              <h2 className={h2}>Каталог книг</h2>
            </div>
            <a href="#search" className="text-xs text-wine">Більше +</a>
          </div>
          <BookList books={books} empty="Книг поки немає. Додайте першу!" {...actions} />
        </section>

        <Banner book={picked[0] ?? books[0]} liked={liked} onOpen={() => (setSearch(""), setGenre(WISH), toResults())} />

        <section id="search" className={`${wrap} scroll-mt-12`}>
          <p className={label}>Жанри</p>
          <h2 className={`${h2} mb-4 border-b border-wine/30 pb-2`}>Категорії та пошук</h2>
          <Filters genre={genre} setGenre={setGenre} books={books} liked={liked} onReset={reset} />
          <div className="mt-6">
            {found ? (
              <>
                <p className="mb-3 text-xs text-olive/70">
                  Знайдено в базі даних: {found.length}
                  {search && ` · запит «${search}»`}
                </p>
                <BookList books={found} empty="За вашим запитом нічого не знайдено." {...actions} />
              </>
            ) : (
              <p className="text-xs text-olive/60 italic">Оберіть жанр або введіть запит у пошуку — книги шукаються в базі даних.</p>
            )}
          </div>
        </section>

        <section className={wrap}>
          <div className={card}>
            <h2 className={`${h2} mb-4`}>Додати книгу</h2>
            <BookForm onAdd={addBook} />
          </div>
        </section>
      </main>

      <footer className="bg-khaki px-4 py-6 text-[11px] text-olive">
        <div className="mx-auto max-w-5xl sm:px-8">
          <p className="font-semibold">Графік роботи</p>
          <p>Пн–Пт: 09:00–20:00 · Сб–Нд: 10:00–18:00</p>
          <p className="mt-2 opacity-70">Лабораторна робота №4 · Книгарня «Букварня»</p>
        </div>
      </footer>

      {selected && (
        <BookModal
          book={books.find((b) => b._id === selected._id) ?? selected}
          liked={wish.includes(selected._id)}
          onClose={() => setSelected(null)}
          onCart={(b) => changeQty(b, 1)}
          onWish={toggleWish}
        />
      )}
      {cartOpen && <Cart items={items} onQty={changeQty} onClear={() => setCart({})} onCheckout={checkout} onClose={() => setCartOpen(false)} />}
    </div>
  );
}
