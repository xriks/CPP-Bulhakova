const requiredTextFields = ['title', 'author', 'publisher', 'genre'];

export function validateBook(req, res, next) {
  const body = req.body || {};

  for (const field of requiredTextFields) {
    const value = body[field];
    if (typeof value !== 'string' || value.trim() === '') {
      return res
        .status(400)
        .json({ message: `Поле "${field}" є обов'язковим і не може бути порожнім` });
    }
  }

  const price = Number(body.price);
  if (body.price === undefined || body.price === '' || Number.isNaN(price) || price < 0) {
    return res
      .status(400)
      .json({ message: 'Поле "price" має бути невід\'ємним числом' });
  }

  const stock = Number(body.stock);
  if (
    body.stock === undefined ||
    body.stock === '' ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    return res
      .status(400)
      .json({ message: 'Поле "stock" має бути невід\'ємним цілим числом' });
  }

  next();
}
