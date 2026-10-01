import { Link } from "react-router-dom";

export default function BookCard({ book, onDelete }) {
  return (
    <div className="card">
      <img src={`http://localhost:5001/uploads/${book.image}`} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>${book.price}</p>

      <Link to={`/book/${book.id}`}>
        <button>View</button>
      </Link>
      <Link to={`/edit/${book.id}`}>
        <button>Edit</button>
      </Link>
      <button className="danger" onClick={() => onDelete(book.id)}>
        Delete
      </button>
    </div>
  );
}
