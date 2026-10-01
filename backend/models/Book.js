
import db from "../config/db.js";

export const Book = {
  getAll: async () => (await db.query("SELECT * FROM books"))[0],
  getById: async (id) => (await db.query("SELECT * FROM books WHERE id=?", [id]))[0][0],
  create: async (b) =>
    (await db.query(
      "INSERT INTO books (title,author,price,description,image) VALUES (?,?,?,?,?)",
      [b.title, b.author, b.price, b.description, b.image]
    ))[0].insertId,
  update: async (id, b) =>
    db.query(
      "UPDATE books SET title=?,author=?,price=?,description=?,image=? WHERE id=?",
      [b.title, b.author, b.price, b.description, b.image, id]
    ),
  delete: async (id) => db.query("DELETE FROM books WHERE id=?", [id])
};
