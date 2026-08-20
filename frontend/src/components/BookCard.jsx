function BookCard({ title, author, category, available }) {
  return (
    <article className="book-card">
      <div className="book-card-topline">
        <span className="book-category">{category}</span>
        <span className={available ? 'availability available' : 'availability unavailable'}>
          {available ? 'Available' : 'Not Available'}
        </span>
      </div>
      <h3>{title}</h3>
      <p>by {author}</p>
    </article>
  );
}

export default BookCard;
