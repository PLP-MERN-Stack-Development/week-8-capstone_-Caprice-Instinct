import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Book = ({ book }) => {
  return (
    <Card className='my-3 p-3 rounded book-card'>
      <Card.Img 
        src={book.image || 'https://via.placeholder.com/200x250?text=No+Image'} 
        variant='top' 
        className='book-image'
      />
      <Card.Body>
        <Card.Title as='div'>
          <strong>{book.title}</strong>
        </Card.Title>
        <Card.Text as='div'>
          <p>By {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Condition: {book.condition}</p>
          <p>Owner: {book.user.name}</p>
          <p>Location: {book.user.location}</p>
        </Card.Text>
        <Link to={`/book/${book._id}`}>
          <Button variant='primary' className='btn-sm'>
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Book;