import { dark, ghost, wine, useEsc } from "../ui";

export default function Cart({ items, onQty, onClear, onCheckout, onClose }) {
  useEsc(onClose);
  const total = items.reduce((s, b) => s + b.price * b.qty, 0);
  return (
    <div onClick={onClose} className="fixed inset-0 z-40 bg-black/50">
      <aside onClick={(e) => e.stopPropagation()} className="ml-auto flex h-full w-full max-w-sm flex-col gap-3 bg-bone p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-khaki pb-2">
          <h2 className="text-xl font-bold text-wine">Кошик</h2>
          <button onClick={onClose} aria-label="Закрити" className="cursor-pointer text-xl">✕</button>
        </div>
        {!items.length && <p className="text-gray-500 italic">Кошик порожній.</p>}
        <ul className="flex-1 space-y-3 overflow-y-auto">
          {items.map((b) => (
            <li key={b._id} className="rounded-lg border border-khaki bg-white/60 p-3 text-sm">
              <p className="font-semibold">{b.title}</p>
              <p className="text-gray-500">{b.author}</p>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => onQty(b, -1)} className={`${ghost} px-2.5 py-0.5`}>−</button>
                <span className="w-6 text-center">{b.qty}</span>
                <button onClick={() => onQty(b, 1)} className={`${ghost} px-2.5 py-0.5`}>+</button>
                <span className="ml-auto font-bold text-wine">{b.price * b.qty} грн</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-right text-lg font-bold">Разом: {total} грн</p>
        <button onClick={onCheckout} disabled={!items.length} className={wine}>Оформити замовлення</button>
        <button onClick={onClear} disabled={!items.length} className={dark}>Очистити кошик</button>
      </aside>
    </div>
  );
}
