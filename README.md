# blog-api

Simple blog REST API using Node.js, Express and ES modules. The project uses a
JSON file as a mock database so it can run without any external services.

## Scripts

- `npm run dev` - start server with nodemon
- `npm start` - start server

API endpoints under `/posts` support create, read, update and delete.
Authentication endpoints are available under `/auth` for register, login,
token refresh and logout.

Copy `.env.example` to `.env` and adjust the values before running the app.
