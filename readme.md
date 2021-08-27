# Node API boilerplate by nave.rs

A boilerplate for building RESTful APIs using Node.js, PostgreSQL, koa, knex, objection.

# Getting started

## Installation

1. Install [Node.JS](https://nodejs.org/en/) LTS version
2. Install MongoDB community
3. Clone this repository and enter on the respective folder
4. Install dependencies running: `yarn` or `npm install`
## Testing

1. Run tests: `yarn test`

## Directory Structure

```
├── /src
|   ├── /controllers
|   ├── /helpers
|   ├── /middleware
|   ├── /models
|   ├── /routes
|   ├── /validators
├── /test
```

## Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/fd92c4e312af4ee3792c?action=collection%2Fimport)

## Styleguide

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Nodemailer

To use the nodemailer helper in a non-production environment, you need to set the variable in .env `ALLOW_LIST` and assign an array with the domains allowed for sending e-mail. This domain must start with an `@`, followed by a minimum of 2 characters, a `.` and 2 characters in the end.
In case the informed email is not part of any informed domain, the email will not be sent.

### Examples:

- ALLOW_LIST=["@nave.rs"]
- EMAIL_1: gustavo@nave.rs - `ALLOWED`
- EMAIL_2: gcdpinho@gmail.com - `NOT ALLOWED`

The following domains: `nave.rs` and`@nave` are not allowed as they do not satisfy the domain description, given above.

## Database

This project uses mongoose as ORM.

## Steps to use Queue UI

1. After adding a new queue, need to add in queue.js a new `adapter`
2. Acess UI on http://localhost:3001/v1/queues/dashboards
