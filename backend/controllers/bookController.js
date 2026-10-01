
import { Book } from "../models/Book.js";
import fs from "fs";

export const getBooks = async (_, res) =>
  res.json({ success: true, data: await Book.getAll() });

export const getBook = async (req, res) => {
  const b = await Book.getById(req.params.id);
  b ? res.json({ success: true, data: b })
    : res.status(404).json({ success: false });
};

export const createBook = async (req, res) =>
  res.json({
    success: true,
    data: await Book.create({ ...req.body, image: req.file?.filename || null })
  });

export const updateBook = async (req, res) => {
  const old = await Book.getById(req.params.id);
  const image = req.file ? req.file.filename : old.image;
  if (req.file && old.image) fs.unlinkSync(`uploads/${old.image}`);
  await Book.update(req.params.id, { ...req.body, image });
  res.json({ success: true });
};

export const deleteBook = async (req, res) => {
  const b = await Book.getById(req.params.id);
  if (b.image) fs.unlinkSync(`uploads/${b.image}`);
  await Book.delete(req.params.id);
  res.json({ success: true });
};
