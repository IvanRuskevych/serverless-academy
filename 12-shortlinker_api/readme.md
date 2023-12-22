# TASK 12. SHORTLINKER API

We have all encountered long URLs that are extremely inconvenient to use in, say, the same correspondence. So special services appeared that deal with reducing kilometers of links into something concise. After solving a number of tasks, which you have already managed to do in Serverless Academy, you are now able to write your own links truncator - that is the essence of this task.

## Your task is to create a server application which:

- Will receive a request with a link to a target resource from a user in a POST request;
- As a response it will return a shortened version of the link;
- By further following this link, the user should be able to get to the original resource, which he wanted to shorten.

## Requirements:

- Do not use shortening services like TinyURL and their APIs.
- Make sure that your short URL is really short (excluding the domain name, obviously we’re not going to buy a domain name for this task).
- Make sure you validate users input. For example, instead of a valid link a user can enter some nonsense by mistake. Your service should handle such scenarios.
- in this task you have complete freedom to choose which frameworks, tools, and packages to use.

## Description:

The server application allows you to:

- Receive a request with a link to a target resource from a user in a POST request;
- As a response the server application will return a shortened version of the link;
- By further following this link, the user can get to the original resource.

## To run application:

- Install the required dependencies by running `npm install`.
- Create an `.env` based on its `.env.sample` example
- Start the server using `npm start` for production or `npm run dev` for development with nodemon.

## Endpoints:

- `(POST) /links` - create shorted link
- `(GET) /:marker` - redirect to original link
