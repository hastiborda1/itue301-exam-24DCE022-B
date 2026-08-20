import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="hero-section">
      <p className="eyebrow">Advanced library frontend</p>
      <h1>Explore. Discover. Borrow.</h1>
      <p className="hero-copy">A modern library system for browsing curated book information, checking live availability, and managing borrowing details.</p>
      <div className="hero-actions">
        <Link className="button primary" to="/books">Explore books</Link>
        <Link className="button secondary" to="/borrow">Borrow a book</Link>
      </div>
    </section>
  );
}

export default HomePage;
