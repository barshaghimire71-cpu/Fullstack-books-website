import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data.data);
      } catch {
        setErr("Book not found.");
      }
    })();
  }, [id]);

  if (err) return <p style={{ color: "crimson" }}>{err}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800 }}>
      <Link to="/">← Back</Link>
      <h2 style={{ marginTop: 10 }}>{book.title}</h2>
      <p style={{ color: "#374151" }}>{book.author}</p>
      <p style={{ marginTop: 6 }}>${Number(book.price || 0).toFixed(2)}</p>

      {book.image && (
        <img
          alt={book.title}
          src={`http://localhost:5001/uploads/${book.image}`}
          style={{ width: "100%", maxWidth: 420, marginTop: 12, borderRadius: 10 }}
        />
      )}

      <p style={{ marginTop: 12 }}>{book.description}</p>

      <div style={{ marginTop: 12 }}>
        <Link to={`/edit/${book.id}`}><button>Edit</button></Link>
      </div>
    </div>
  );
}
