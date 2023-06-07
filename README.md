# MERN Auth Application

```markdown

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) authentication application that allows users to sign up, sign in, sign out, and update their profile. The application uses an Express authentication system and HTTP-only cookies for session management.

The frontend is built using React, Chakra UI for styling, React Router for routing, and Zustand for global state management. The backend is built with Express.js and MongoDB using Mongoose for database interaction.

## Features

- User registration: Users can sign up with a unique email address and password.
- User login: Existing users can sign in with their credentials.
- User logout: Users can sign out, which clears their session.
- Profile update: Users can update their profile information, such as their name.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js: [Installation Guide](https://nodejs.org)
- MongoDB: [Installation Guide](https://docs.mongodb.com/manual/installation/)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/daudln/mern-auth.git
cd mern-auth
```

2. Install the dependencies for both the frontend and backend:

```bash
# Install backend dependencies (in the mern-auth folder)
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Configure the environment variables:

- In the `mern-auth` directory, create a `.env` file and provide the following variables:

  ```env
  PORT=8000
  MONGODB_URI=<your-mongodb-connection-string>
  JWT_SECRET=<your-jwt-secret-key>
  ```

  Replace `<your-mongodb-connection-string>` with your MongoDB connection string and `<your-jwt-secret-key>` with a secret key for JWT token generation.

4. Run the application:

- In the `backend` directory:

  ```bash
  npm start
  ```

- In the `mern-auth` directory:

  ```bash
  npm run dev
  ```

5. Open your browser and navigate to `http://localhost:8000` to access the application.

## Folder Structure

The application is organized into the following directory structure:

```markdown
mern-auth-application/
  ├── backend/
  │   ├── controllers/        # Express controller functions
  │   ├── middleware/         # Custom middleware functions
  │   ├── models/             # Mongoose models
  │   ├── routes/             # Express routes
  │   └── app.js              # Express app configuration
  │   └── connection.js       # Express to Mongoose connection configuration
  │   └── server.js           # Express server configuration
  ├── frontend/
  │   ├── public/             # Public assets
  │   ├── src/
  │   │   ├── components/     # React components
  │   │   ├── assets/         # React assets folder
  │   │   ├── pages/          # React pages
  │   │   ├── store/          # React state manager
  │   │   ├── App.tsx         # Layout component
  │   │   ├── main.tsx        # Main React component
  │   │   └── routers.tsx     # Router layout
```

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

```