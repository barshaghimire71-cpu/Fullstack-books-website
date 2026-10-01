import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import EditBookPage from "./pages/EditBookPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 14, background: "#111827" }}>
        <Link style={{ color: "white", marginRight: 14, textDecoration: "none" }} to="/">
          Home
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/add">
          Add Book
        </Link>
      </nav>

      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/edit/:id" element={<EditBookPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
