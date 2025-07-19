import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMyExchanges } from '../actions/exchangeActions';

const ExchangeListScreen = () => {
  const dispatch = useDispatch();

  const exchangeListMy = useSelector((state) => state.exchangeListMy);
  const { loading, error, exchanges } = exchangeListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listMyExchanges());
    }
  }, [dispatch, userInfo]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'completed':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      <h1>My Exchanges</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {exchanges.length === 0 ? (
            <Message>You have no exchange requests.</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>BOOK</th>
                  <th>WITH</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {exchanges.map((exchange) => (
                  <tr key={exchange._id}>
                    <td>{exchange._id}</td>
                    <td>{exchange.book.title}</td>
                    <td>
                      {userInfo._id === exchange.owner._id
                        ? exchange.requestor.name
                        : exchange.owner.name}
                    </td>
                    <td>{exchange.createdAt.substring(0, 10)}</td>
                    <td>
                      <span
                        className={`badge bg-${getStatusVariant(exchange.status)}`}
                      >
                        {exchange.status}
                      </span>
                    </td>
                    <td>
                      <LinkContainer to={`/exchange/${exchange._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default ExchangeListScreen;