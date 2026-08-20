import { useState } from 'react';

function BorrowPage() {
  const [memberName, setMemberName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    window.alert('Borrowing details are ready to submit.');
  }

  return (
    <section className="content-section narrow-section">
      <p className="eyebrow">Borrowing desk</p>
      <h1>Record a book borrow</h1>
      <p className="section-intro">Enter the member and book details below.</p>
      <form className="borrow-form" onSubmit={handleSubmit}>
        <label>Member name<input value={memberName} onChange={(event) => setMemberName(event.target.value)} required /></label>
        <label>Book title<input value={bookTitle} onChange={(event) => setBookTitle(event.target.value)} required /></label>
        <div className="form-row">
          <label>Borrow date<input type="date" value={borrowDate} onChange={(event) => setBorrowDate(event.target.value)} required /></label>
          <label>Return date<input type="date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)} required /></label>
        </div>
        <button className="button primary" type="submit">Save borrowing</button>
      </form>
      <div className="live-preview">
        <span>Live state preview</span>
        <strong>{memberName ? `${memberName} is borrowing ${bookTitle || 'a book'}.` : 'Start typing to see state updates.'}</strong>
      </div>
    </section>
  );
}

export default BorrowPage;
