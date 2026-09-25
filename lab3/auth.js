import jwt from 'jsonwebtoken';
import { users } from './data.js';

export const JWT_SECRET = 'lab3-secret';

export function createToken(user) {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
}

export function getUserFromToken(token) {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return users.find((u) => u.id === payload.id) || null;
  } catch {
    return null;
  }
}

export function getUserFromAuthHeader(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice('Bearer '.length).trim();
  return getUserFromToken(token);
}
