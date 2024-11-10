<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

The portfolio API is a web application that provides a set of RESTful APIs for managing user profiles, projects, competencies, education, and professional experiences. The project utilizes the NestJS framework, which provides a robust and scalable foundation for building the API. The API is built using TypeScript, Docker Compose, and various libraries such as TypeORM, Passport.js, and Axios.

**Libraries/Tools Used**

- NestJS: used as the primary framework for building the API
- TypeScript: used as the primary programming language for building the API
- TypeORM: used as an object-relational mapping (ORM) tool for interacting with databases
- Passport.js: used as an authentication middleware to handle user authentication and authorization
- Class-validator: used as a library for validating data in the API
- Class-transformer: used as a library for transforming data between different formats
- JWT (JSON Web Tokens): used as a token-based authentication mechanism
- OAuth 2.0 (for Google authentication): used to authenticate users using their Google account
- Axios Library: used to make HTTP requests to the API from frontend applications

**Features**

The portfolio API provides the following features:

1. **Profile Management**: Users can manage their own profiles, including their name, email, and other personal information
2. **Projects History**: Users can manage projects they have worked on, with details such as project title, description, and dates.
3. **Professional Experiences**: Users can create, update, and delete their professional experiences, including job titles, company names, and dates.
4. **Education**: Users can create, update, and delete their education records, including degrees earned, institutions attended, and dates.
5. **Competences Management**: Users manage their competencies and provide the level of competence for each

**Authentication**

The portfolio API includes authentication using Google OAuth 2.0, as well as Casal (a library for handling Casl policies), which allows users to authenticate and authorize their access to the API based on their role and permissions.

**Security Measures**

The portfolio API includes several security measures to protect against common web vulnerabilities:

- Authentication: JWT authentication using Passport.js
- Authorization: Role-based access control using TypeORM, Passport.js, and Casal
- Input validation: Using Class-validator and Class-transformer for input validation
- Error handling: Custom error handling mechanism using NestJS

**Scalability and Performance**

The portfolio API is designed to scale horizontally, with support for load balancing and multiple instances of each service. The API uses a RESTful architecture, which allows for easy scalability and flexibility.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

MIT License
