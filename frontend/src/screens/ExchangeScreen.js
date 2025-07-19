import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getExchangeDetails,
  updateExchangeStatus,
  addMessage,
} from '../actions/exchangeActions';
import { EXCHANGE_UPDATE_STATUS_RESET, EXCHANGE_ADD_MESSAGE_RESET } from '../constants/exchangeConstants';
import io from 'socket.io-client';

const ExchangeScreen = () => {
  const [socket, setSocket] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const messagesEndRef = useRef(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const exchangeDetails = useSelector((state) => state.exchangeDetails);
  const { loading, error, exchange } = exchangeDetails;

  const exchangeUpdateStatus = useSelector((state) => state.exchangeUpdateStatus);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = exchangeUpdateStatus;

  const exchangeAddMessage = useSelector((state) => state.exchangeAddMessage);
  const {
    loading: loadingAddMessage,
    error: errorAddMessage,
    success: successAddMessage,
  } = exchangeAddMessage;

  useEffect(() => {
    // Connect to socket.io
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && exchange) {
      // Join room based on exchange ID
      socket.emit('join_room', { room: exchange._id });

      // Listen for new messages
      socket.on('receive_message', (data) => {
        dispatch(getExchangeDetails(id));
      });
    }
  }, [socket, exchange, dispatch, id]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EXCHANGE_UPDATE_STATUS_RESET });
    }
    
    if (successAddMessage) {
      dispatch({ type: EXCHANGE_ADD_MESSAGE_RESET });
    }
    
    dispatch(getExchangeDetails(id));
  }, [dispatch, id, successUpdate, successAddMessage]);

  useEffect(() => {
    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [exchange]);

  const updateStatusHandler = (status) => {
    dispatch(updateExchangeStatus(id, status));
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (messageContent.trim() !== '') {
      dispatch(addMessage(id, messageContent));
      setMessageContent('');
      
      // Emit message to socket
      if (socket) {
        socket.emit('send_message', {
          room: id,
          content: messageContent,
          sender: userInfo._id,
        });
      }
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/exchanges'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1>Exchange Request</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Book Details</h2>
                  {exchange.book && (
                    <>
                      <p>
                        <strong>Title:</strong> {exchange.book.title}
                      </p>
                      <p>
                        <strong>Author:</strong> {exchange.book.author}
                      </p>
                      <p>
                        <strong>Condition:</strong> {exchange.book.condition}
                      </p>
                    </>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Messages</h2>
                  <div className='message-container'>
                    {exchange.messages && exchange.messages.length === 0 ? (
                      <Message>No messages yet. Start the conversation!</Message>
                    ) : (
                      exchange.messages &&
                      exchange.messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`message ${
                            msg.sender === userInfo._id ? 'message-mine' : 'message-other'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className='message-time'>
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <Form onSubmit={sendMessageHandler}>
                    <Form.Group controlId='message' className='mb-3'>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder='Type your message here...'
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      type='submit'
                      variant='primary'
                      disabled={loadingAddMessage}
                    >
                      {loadingAddMessage ? 'Sending...' : 'Send Message'}
                    </Button>
                    {errorAddMessage && (
                      <Message variant='danger'>{errorAddMessage}</Message>
                    )}
                  </Form>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Exchange Status</h2>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span
                        className={`badge ${
                          exchange.status === 'pending'
                            ? 'bg-warning'
                            : exchange.status === 'accepted'
                            ? 'bg-success'
                            : exchange.status === 'rejected'
                            ? 'bg-danger'
                            : 'bg-info'
                        }`}
                      >
                        {exchange.status}
                      </span>
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p>
                      <strong>Requestor:</strong>{' '}
                      {exchange.requestor && exchange.requestor.name}
                    </p>
                    <p>
                      <strong>Owner:</strong> {exchange.owner && exchange.owner.name}
                    </p>
                  </ListGroup.Item>
                  {userInfo &&
                    exchange.owner &&
                    userInfo._id === exchange.owner._id &&
                    exchange.status === 'pending' && (
                      <ListGroup.Item>
                        <h2>Actions</h2>
                        {loadingUpdate && <Loader />}
                        {errorUpdate && (
                          <Message variant='danger'>{errorUpdate}</Message>
                        )}
                        <Button
                          type='button'
                          className='btn btn-success btn-block mb-2'
                          onClick={() => updateStatusHandler('accepted')}
                        >
                          Accept Exchange
                        </Button>
                        <Button
                          type='button'
                          className='btn btn-danger btn-block'
                          onClick={() => updateStatusHandler('rejected')}
                        >
                          Reject Exchange
                        </Button>
                      </ListGroup.Item>
                    )}
                  {userInfo &&
                    ((exchange.owner && userInfo._id === exchange.owner._id) ||
                      (exchange.requestor && userInfo._id === exchange.requestor._id)) &&
                    exchange.status === 'accepted' && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-primary btn-block'
                          onClick={() => updateStatusHandler('completed')}
                        >
                          Mark as Completed
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ExchangeScreen;