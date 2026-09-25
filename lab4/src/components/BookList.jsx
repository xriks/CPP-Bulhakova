import BookItem from "./BookItem";

export default function BookList({ books, empty, wish = [], ...actions }) {
  if (!books.length) return <p className="py-6 text-center text-xs text-olive/60 italic">{empty}</p>;
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book) => (
        <BookItem key={book._id} book={book} liked={wish.includes(book._id)} {...actions} />
      ))}
    </ul>
  );
}
