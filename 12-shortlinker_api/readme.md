## ShortLinker API:

1. The server application that allows you to:

- Receive a request with a link to a target resource from a user in a POST request;
- As a response the server application will return a shortened version of the link;
- By further following this link, the user can get to the original resource.

2. Installation and Usage

- Install the required dependencies by running `npm install`.
- Create an `.env` based on its `.env.sample` example
- Run the SQL script from `db.sql` [to set up the required database schema](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-create-table/).
- Start the server using `npm start` for production or `npm run dev` for development with nodemon.

3. API Endpoints

- `POST /links`: Create a shortened link. You can send a JSON object with the original link to get a shortened URL in response.
  - EXAMPLE of request: {"link": "https://www.typescriptlang.org/play?#handbook-0"}
  - EXAMPLE of response: {"data": "http://localhost:3000/QcW6rHzv"}
- `GET /:marker`: Access a shortened link (http://localhost:3000/QcW6rHzv). It will redirect you to the original link.
