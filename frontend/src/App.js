import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookScreen from './screens/BookScreen';
import BookListScreen from './screens/BookListScreen';
import BookEditScreen from './screens/BookEditScreen';
import BookCreateScreen from './screens/BookCreateScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import ExchangeListScreen from './screens/ExchangeListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/book/:id' element={<BookScreen />} />
            <Route path='/books' element={<BookListScreen />} />
            <Route path='/book/create' element={<BookCreateScreen />} />
            <Route path='/book/:id/edit' element={<BookEditScreen />} />
            <Route path='/exchanges' element={<ExchangeListScreen />} />
            <Route path='/exchange/:id' element={<ExchangeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;