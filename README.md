## Packages used

express express-session graphql @apollo/server @graphql-tools/merge bcryptjs dotenv graphql-passport passport mongoose connect-mongodb-session

## graphql package

- Its is the core GraphQL implementation in **Javascript**
- Its provides the functionality to define GraphQL schemas, parse and
  validate queries, execute queries against a schema, and format response.
- This graphql package is not tied to any specific server or client framework, it's a standalone library that can be used in various javascript environments

## @apollo/server

- This package is basically a part of Apollo ecosystem and its used for building GraphQL servers in Node.JS
- It provides tools and utilities to create and manage GraphQL Schemas, handle incoming GraphQL requests, execute queries, and send responses
- @apollo/server is built on topo of express, making it easy to integrate GraphQL into existing node.js web applications
- @apollo/server simplifies the process of creating and maintaining GraphQL servers in Node.JS environments

## GraphQL Schema

- A GraphQL schema is a fundamental concept in GraphQL.
- It defines the structure of the data that clients can query and the operations they can perform. A schema in GraphQL typically consists of two main parts: **typeDefs** and **resolvers**.

## TypeDefs (or TypeDefinitions)

- Type definitions define the shape of the data available in the GraphQL API. They specify the types of objects that can be queried and the relationships between them.

## Resolvers

- Resolvers are functions that determine how to fetch the data associated with each field in the schema.

## Features

- Great developer experience: Helpful tooling for Typescript, Chrome devtools, and Vs code
- Declarative data fetching: Write a query and receive data without manually tracking loading states
  - Apollo client handles the full request lifecycle from start to finish including tracking loading and error states. Also there is no middleware boilerplate code to setup before malking your first request and you don't need to worry about the caching or transforming responses. All you have to do is describe the data your component needed and let apollo client handle the heavy lifting.
- Designed for modern React: Take advantage of the latest React features such as hooks
- Incrementally adoptable: Drop Apollo into any javascript app and incorporate it feature by feature
- Universally compatible: Use any build setup and any GraphQL API
- Community driven: Share knowledge with thousand developers in the graphql community
