# Book Exchange Web Application

A MERN stack application that allows users to share and exchange books with others in their community.

## Features

- User authentication and profile management
- Book listing and management
- Book exchange requests and messaging
- Real-time chat using Socket.io
- Responsive design with React Bootstrap

## Tech Stack

- **Frontend**: React, Redux, React Router, React Bootstrap, Socket.io Client
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Setup

1. Clone the repository
```
git clone <repository-url>
cd book-exchange
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Install frontend dependencies
```
cd ../frontend
npm install
```

4. Create a .env file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-exchange
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Running the Application

1. Start the backend server
```
cd backend
npm run dev
```

2. Start the frontend development server
```
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Users
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Authenticate user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Books
- `GET /api/books` - Get all available books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book
- `GET /api/books/mybooks` - Get user's books

### Exchanges
- `POST /api/exchanges` - Create an exchange request
- `GET /api/exchanges` - Get user's exchanges
- `GET /api/exchanges/:id` - Get a specific exchange
- `PUT /api/exchanges/:id` - Update exchange status
- `POST /api/exchanges/:id/messages` - Add a message to an exchange

## Testing

Run tests with:
```
cd backend
npm test
```

## Deployment

The application can be deployed to platforms like Heroku, Vercel, or Netlify. Detailed deployment instructions will be added soon.

## Screenshots

(Screenshots will be added here)

## Video Demonstration

(Link to video demonstration will be added here)

## License

This project is licensed under the MIT License.