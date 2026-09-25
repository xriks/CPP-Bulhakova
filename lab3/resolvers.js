import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import { users, books, getNextUserId, getNextBookId } from './data.js';
import { createToken } from './auth.js';

function requireAuth(context) {
  if (!context.user) {
    throw new GraphQLError('Потрібна авторизація.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return context.user;
}

function badInput(message) {
  return new GraphQLError(message, { extensions: { code: 'BAD_USER_INPUT' } });
}

export const resolvers = {
  Query: {
    users: () => users,

    me: (parent, args, context) => context.user || null,

    books: (parent, { genre, search }) => {
      let result = books;
      if (genre) {
        result = result.filter((b) => b.genre.toLowerCase() === genre.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(
          (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
        );
      }
      return result;
    },

    book: (parent, { id }) => books.find((b) => b.id === id) || null,
  },

  Mutation: {
    register: async (parent, { name, email, password }) => {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanName || !cleanEmail || !password) {
        throw badInput("Поля name, email і password є обов'язковими.");
      }
      if (users.some((u) => u.email === cleanEmail)) {
        throw badInput('Користувач з таким email вже існує.');
      }
      const user = {
        id: getNextUserId(),
        name: cleanName,
        email: cleanEmail,
        password: await bcrypt.hash(password, 10),
      };
      users.push(user);
      return { token: createToken(user), user };
    },

    login: async (parent, { email, password }) => {
      const user = users.find((u) => u.email === email.trim().toLowerCase());
      const valid = user && (await bcrypt.compare(password, user.password));
      if (!valid) {
        throw new GraphQLError('Невірний email або пароль.', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      return { token: createToken(user), user };
    },

    createBook: (parent, args, context) => {
      const user = requireAuth(context);
      const { title, author, publisher, genre, price, stock, description } = args;
      for (const [field, value] of Object.entries({ title, author, publisher, genre })) {
        if (!value.trim()) {
          throw badInput(`Поле "${field}" не може бути порожнім.`);
        }
      }
      if (price < 0) throw badInput('Ціна не може бути від’ємною.');
      if (stock < 0) throw badInput('Залишок не може бути від’ємним.');

      const book = {
        id: getNextBookId(),
        title: title.trim(),
        author: author.trim(),
        publisher: publisher.trim(),
        genre: genre.trim(),
        price,
        stock,
        description: description ? description.trim() : '',
        owner: user,
      };
      books.push(book);
      return book;
    },

    deleteBook: (parent, { id }, context) => {
      requireAuth(context);
      const index = books.findIndex((b) => b.id === id);
      if (index === -1) return false;
      books.splice(index, 1);
      return true;
    },
  },
};
