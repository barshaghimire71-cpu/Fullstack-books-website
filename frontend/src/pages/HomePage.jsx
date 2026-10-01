import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const res = await api.get("/books");
      setBooks(res.data.data || []);
    } catch (e) {
      setErr("Failed to load books. Is backend running on 5001?");
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this book?")) return;
    await api.delete(`/books/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>📚 Bookstore</h2>
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      {books.length === 0 ? (
        <p>No books yet. Click “Add Book”.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {books.map((b) => (
            <div key={b.id} style={{ background: "white", padding: 12, borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
              {b.image ? (
                <img
                  alt={b.title}
                  src={`http://localhost:5001/uploads/${b.image}`}
                  style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8, marginBottom: 10 }}
                />
              ) : (
                <div style={{ width: "100%", height: 160, background: "#e5e7eb", borderRadius: 8, marginBottom: 10 }} />
              )}

              <div style={{ fontWeight: 700 }}>{b.title}</div>
              <div style={{ color: "#374151", marginTop: 4 }}>{b.author}</div>
              <div style={{ marginTop: 6 }}>${Number(b.price || 0).toFixed(2)}</div>

              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <Link to={`/book/${b.id}`}><button>View</button></Link>
                <Link to={`/edit/${b.id}`}><button>Edit</button></Link>
                <button onClick={() => del(b.id)} style={{ background: "crimson", color: "white" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
