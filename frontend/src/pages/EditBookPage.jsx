import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function EditBookPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/books/${id}`);
        const b = res.data.data;
        setTitle(b.title || "");
        setAuthor(b.author || "");
        setPrice(b.price ?? "");
        setDescription(b.description || "");
        setCurrentImage(b.image || "");
      } catch {
        setErr("Failed to load book.");
      }
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("author", author);
      fd.append("price", price);
      fd.append("description", description);
      if (image) fd.append("image", image);

      await api.put(`/books/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      nav("/");
    } catch {
      setErr("Failed to update.");
    }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ marginBottom: 10 }}>✏️ Edit Book</h2>
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      {currentImage && (
        <img
          alt="Current"
          src={`http://localhost:5001/uploads/${currentImage}`}
          style={{ width: "100%", maxWidth: 320, borderRadius: 10, marginBottom: 10 }}
        />
      )}

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input placeholder="Price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        <textarea placeholder="Description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
