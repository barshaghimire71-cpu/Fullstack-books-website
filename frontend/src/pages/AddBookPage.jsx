import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AddBookPage() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!title.trim() || !author.trim() || !price) {
      setErr("Title, Author, Price are required.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("author", author);
      fd.append("price", price);
      fd.append("description", description);
      if (image) fd.append("image", image);

      await api.post("/books", fd, { headers: { "Content-Type": "multipart/form-data" } });
      nav("/");
    } catch (e2) {
      setErr("Failed to add book. Check backend + DB.");
    }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ marginBottom: 10 }}>➕ Add Book</h2>
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input placeholder="Price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        <textarea placeholder="Description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
