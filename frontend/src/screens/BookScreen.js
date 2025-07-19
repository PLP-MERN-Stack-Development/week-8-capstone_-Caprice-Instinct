import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBookDetails } from '../actions/bookActions';
import { createExchange } from '../actions/exchangeActions';
import { EXCHANGE_CREATE_RESET } from '../constants/exchangeConstants';

const BookScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const exchangeCreate = useSelector((state) => state.exchangeCreate);
  const {
    loading: loadingExchange,
    error: errorExchange,
    success: successExchange,
  } = exchangeCreate;

  useEffect(() => {
    if (successExchange) {
      navigate('/exchanges');
      dispatch({ type: EXCHANGE_CREATE_RESET });
    } else {
      dispatch(listBookDetails(id));
    }
  }, [dispatch, id, successExchange, navigate]);

  const requestExchangeHandler = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(createExchange(id));
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Image
                src={book.image || 'https://via.placeholder.com/300x400?text=No+Image'}
                alt={book.title}
                fluid
              />
            </Col>
            <Col md={5}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{book.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Author: {book.author}</ListGroup.Item>
                <ListGroup.Item>Genre: {book.genre}</ListGroup.Item>
                <ListGroup.Item>Condition: {book.condition}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {book.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Owner:</Col>
                      <Col>
                        <strong>{book.user && book.user.name}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Location:</Col>
                      <Col>
                        <strong>{book.user && book.user.location}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {book.isAvailable ? 'Available' : 'Not Available'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {loadingExchange && <Loader />}
                    {errorExchange && (
                      <Message variant='danger'>{errorExchange}</Message>
                    )}
                    {userInfo && book.user && userInfo._id === book.user._id ? (
                      <Button
                        className='btn-block'
                        type='button'
                        variant='secondary'
                        disabled
                      >
                        This is your book
                      </Button>
                    ) : (
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={!book.isAvailable}
                        onClick={requestExchangeHandler}
                      >
                        Request Exchange
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default BookScreen;