# Bootcamp Project API

## Set up

```bash
createdb bootcampproject
npm run copy-env
```

In a separate terminal, run

```bash
npm run db
bootcampproject=# \i config/script.sql
```

## Run

```bash
npm run start
```

## Make migration

```bash
npx knex migrate:make <MIGRATION_NAME>
```

## Seed with mock data

```bash
npx knex seed:run
```

## Walkthrough

### Stage 1

Create Knex tables and Objection.js models for users, posts, and hobbies. See below for the required fields:

All fields

- id
- createdAt
- updatedAt

Users:

- name
- email
- password
- birthday
- concentration
- hometown
- house
- gender
- bio
- picture (in URL form)

Posts:

- content
- userId

Hobbies:

- hobby (one of 'SPORTS', 'ARTS', 'MUSIC', 'READING', 'TRAVEL', 'DINING', 'CODING')
- userId

You should go about doing this in the following manner. If you need help with syntax, reference the lecture code.

1.  Make the tables using Knex migrations
    - run `npx knex migrate:make <MIGRATION_NAME>` to make a migration file
    - find the new file in the `/db/migrations/` directory
    - in that migration, fill in the information needed for that table. Look at the lecture code as an example
2.  Make the Objection.js models for users, posts, and hobbies in the `/src/models/` directory.
    - A skeleton of the `User` model is already provided.
    - Here, implement methods which get the table name corresponding to the Knex tables made in Step 1
    - Determine the proper relations between different models and make another method to add the relation
    - HINT: For the following relation, you'll need a different type of relation than the other two, and this relation might (it will!) require creating a new 'join table' through knex.

### Stage 2

Complete functions which take advantage of Objection.js functionality to query for various kinds of data.

Implement the functions marked as TODO in `/src/graphql/types/user`, `/src/graphql/types/post`, and `src/graphql/mutations/Post` as per the specifications given therein.

Refer to the Knex documentation and lecture code for syntactical clarifications: https://knexjs.org/

It will be hard to test your functionality without knowledge of GraphQL (look forward to tomorrow!), but if you're curious, just ask one of the TFs!
