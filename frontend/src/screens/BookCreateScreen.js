import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createBook } from '../actions/bookActions';
import { BOOK_CREATE_RESET } from '../constants/bookConstants';

const BookCreateScreen = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('Good');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookCreate = useSelector((state) => state.bookCreate);
  const { loading, error, success, book } = bookCreate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    if (success) {
      dispatch({ type: BOOK_CREATE_RESET });
      navigate(`/book/${book._id}`);
    }
  }, [dispatch, navigate, userInfo, success, book]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBook({
        title,
        author,
        genre,
        description,
        condition,
        image,
      })
    );
  };

  return (
    <>
      <Link to='/books' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add New Book</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='title' className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='author' className='mb-3'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='genre' className='mb-3'>
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter genre'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description' className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='condition' className='mb-3'>
            <Form.Label>Condition</Form.Label>
            <Form.Control
              as='select'
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value='New'>New</option>
              <option value='Like New'>Like New</option>
              <option value='Good'>Good</option>
              <option value='Fair'>Fair</option>
              <option value='Poor'>Poor</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='image' className='mb-3'>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Add Book
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default BookCreateScreen;