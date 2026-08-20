import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/v1/books`;

function BooksPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Could not load books from the server.');
        const result = await response.json();
        if (!result.success || !Array.isArray(result.data)) throw new Error('The catalogue returned an invalid response.');
        setData(result.data);
      } catch (requestError) {
        setError(`Unable to fetch the library catalogue. ${requestError.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  if (loading) return <section className="content-section"><p className="eyebrow">Library catalogue</p><h1>Books</h1><p>Loading books...</p></section>;
  if (error) return <section className="content-section"><p className="eyebrow">Library catalogue</p><h1>Books</h1><p className="error-message">{error}</p></section>;

  return (
    <section className="content-section">
      <p className="eyebrow">Library catalogue</p>
      <h1>Book information</h1>
      <p className="section-intro">Browse titles, authors, categories, and current availability from the live library catalogue.</p>
      <div className="book-grid">
        {data.map((book) => <BookCard key={book.id || book._id} {...book} />)}
      </div>
    </section>
  );
}

export default BooksPage;
