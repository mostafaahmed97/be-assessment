# Backend Assessment

This repositry is my submission for the url monitoring assessment

## Overview

To run the project, clone the repo and run the follwing docker command in the root directory

```bash
docker-compose up --build
```

Now backend will be accessible through `localhost:3000`
and database will be available at `localhost:27017`

## Technologies Used

- **MongoDB**, because the relations between entities are easy to model
  and their structure required storing arrays (for example the tags for a check & polling timestamps), which are easier to deal with in NoSQL vs a relational database.
- **Express** as http server.
- **Jest** for unit testing.

## Project Structure

```
backend/
  __tests__/  -> jest unit tests
  app/        -> express instance
  config/     -> exports config loaded from dotenv
  database/   -> db connection
  middleware/ -> global middleware
  modules/    -> application code, split by feature
    <modulename>
      <modulename.entity.ts>   -> types & interfaces used throughout module
      <modulename>.routes      -> routes for resource
      <modulename>.validators  -> validation schemas for routes (using Joi)
      <modulename>.model       -> model & schema used in db operations
      <modulename>.service     -> business logic
  routes/      -> registers routes for application from modules
  utilities/   -> instances of third party libraries
  index.ts     -> entry point

database/  -> dockerfile for database

```
